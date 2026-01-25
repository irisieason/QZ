# GitHub Packages 发布脚本
# 使用方法: .\scripts\publish.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  发布 @irisieason/qz-react 到 GitHub Packages" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 加载 .env 文件（如果存在）
$envFile = ".env"
if (Test-Path $envFile) {
    Write-Host "加载 .env 文件..." -ForegroundColor Yellow
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*)\s*=\s*(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
            Write-Host "  ✓ 已加载: $name" -ForegroundColor Green
        }
    }
}

# 检查是否有未提交的更改
Write-Host ""
Write-Host "检查 Git 状态..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "警告: 有未提交的更改" -ForegroundColor Red
    Write-Host $gitStatus
    $continue = Read-Host "是否继续? (y/n)"
    if ($continue -ne "y") {
        Write-Host "已取消发布" -ForegroundColor Red
        exit 1
    }
}

# 检查 GitHub Token
Write-Host ""
Write-Host "检查 GitHub Token 配置..." -ForegroundColor Yellow

# 检查环境变量
$envToken = $env:NODE_AUTH_TOKEN
if ($envToken) {
    Write-Host "✓ 找到环境变量 NODE_AUTH_TOKEN" -ForegroundColor Green
} else {
    # 检查全局 .npmrc
    $npmrcPath = "$env:USERPROFILE\.npmrc"
    if (Test-Path $npmrcPath) {
        $npmrcContent = Get-Content $npmrcPath -Raw
        if ($npmrcContent -match "//npm.pkg.github.com/:_authToken=") {
            Write-Host "✓ 找到全局 ~/.npmrc 配置" -ForegroundColor Green
        } else {
            Write-Host "✗ 未找到 GitHub Token 配置" -ForegroundColor Red
            Write-Host ""
            Write-Host "请选择配置方式：" -ForegroundColor Yellow
            Write-Host "1. 在 .env 文件中添加: NODE_AUTH_TOKEN=YOUR_TOKEN"
            Write-Host "2. 在 $npmrcPath 中添加: //npm.pkg.github.com/:_authToken=YOUR_TOKEN"
            Write-Host ""
            Write-Host "详细配置说明请查看: ENV_SETUP.md" -ForegroundColor Cyan
            exit 1
        }
    } else {
        Write-Host "✗ 未找到 Token 配置" -ForegroundColor Red
        Write-Host ""
        Write-Host "请配置 GitHub Token：" -ForegroundColor Yellow
        Write-Host "1. 创建 .env 文件并添加: NODE_AUTH_TOKEN=YOUR_TOKEN"
        Write-Host "2. 或创建 $npmrcPath 并添加配置"
        Write-Host ""
        Write-Host "详细配置说明请查看: ENV_SETUP.md" -ForegroundColor Cyan
        exit 1
    }
}

# 询问版本类型
Write-Host ""
Write-Host "选择版本更新类型:" -ForegroundColor Yellow
Write-Host "1. patch (1.0.0 → 1.0.1) - 修复 bug"
Write-Host "2. minor (1.0.0 → 1.1.0) - 新功能"
Write-Host "3. major (1.0.0 → 2.0.0) - 破坏性更改"
Write-Host "4. 跳过版本更新"
$versionChoice = Read-Host "请选择 (1-4)"

switch ($versionChoice) {
    "1" { 
        Write-Host "更新 patch 版本..." -ForegroundColor Yellow
        npm version patch
    }
    "2" { 
        Write-Host "更新 minor 版本..." -ForegroundColor Yellow
        npm version minor
    }
    "3" { 
        Write-Host "更新 major 版本..." -ForegroundColor Yellow
        npm version major
    }
    "4" { 
        Write-Host "跳过版本更新" -ForegroundColor Yellow
    }
    default {
        Write-Host "无效选择，已取消" -ForegroundColor Red
        exit 1
    }
}

# 构建项目
Write-Host ""
Write-Host "构建项目..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ 构建失败" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 构建成功" -ForegroundColor Green

# 检查 dist 目录
if (-not (Test-Path "dist")) {
    Write-Host "✗ dist 目录不存在" -ForegroundColor Red
    exit 1
}
Write-Host "✓ dist 目录存在" -ForegroundColor Green

# 确认发布
Write-Host ""
$currentVersion = (Get-Content package.json | ConvertFrom-Json).version
Write-Host "准备发布版本: $currentVersion" -ForegroundColor Cyan
$confirm = Read-Host "确认发布? (y/n)"
if ($confirm -ne "y") {
    Write-Host "已取消发布" -ForegroundColor Red
    exit 1
}

# 发布
Write-Host ""
Write-Host "发布到 GitHub Packages..." -ForegroundColor Yellow
npm publish

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ 发布失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ 发布成功!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "包名: @irisieason/qz-react" -ForegroundColor Cyan
Write-Host "版本: $currentVersion" -ForegroundColor Cyan
Write-Host "查看: https://github.com/irisieason/qz-react/packages" -ForegroundColor Cyan
Write-Host ""

# 询问是否推送 tag
$pushTag = Read-Host "是否推送 tag 到 GitHub? (y/n)"
if ($pushTag -eq "y") {
    Write-Host "推送 tag..." -ForegroundColor Yellow
    git push --follow-tags
    Write-Host "✓ Tag 已推送" -ForegroundColor Green
}

Write-Host ""
Write-Host "完成!" -ForegroundColor Green
