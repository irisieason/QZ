#!/bin/bash

# GitHub Packages 发布脚本
# 使用方法: ./scripts/publish.sh

echo "========================================"
echo "  发布 @irisieason/qz-react 到 GitHub Packages"
echo "========================================"
echo ""

# 加载 .env 文件（如果存在）
ENV_FILE=".env"
if [ -f "$ENV_FILE" ]; then
    echo "加载 .env 文件..."
    # 读取 .env 文件并导出环境变量
    while IFS='=' read -r key value; do
        # 跳过注释和空行
        if [[ ! $key =~ ^[[:space:]]*# ]] && [[ -n $key ]]; then
            # 移除前后空格
            key=$(echo "$key" | xargs)
            value=$(echo "$value" | xargs)
            # 导出环境变量
            export "$key=$value"
            echo "  ✓ 已加载: $key"
        fi
    done < "$ENV_FILE"
fi

# 检查是否有未提交的更改
echo ""
echo "检查 Git 状态..."
if [[ -n $(git status --porcelain) ]]; then
    echo "警告: 有未提交的更改"
    git status --porcelain
    read -p "是否继续? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "已取消发布"
        exit 1
    fi
fi

# 检查 GitHub Token
echo ""
echo "检查 GitHub Token 配置..."

# 检查环境变量
if [ -n "$NODE_AUTH_TOKEN" ]; then
    echo "✓ 找到环境变量 NODE_AUTH_TOKEN"
else
    # 检查全局 .npmrc
    NPMRC_PATH="$HOME/.npmrc"
    if [ -f "$NPMRC_PATH" ]; then
        if grep -q "//npm.pkg.github.com/:_authToken=" "$NPMRC_PATH"; then
            echo "✓ 找到全局 ~/.npmrc 配置"
        else
            echo "✗ 未找到 GitHub Token 配置"
            echo ""
            echo "请选择配置方式："
            echo "1. 在 .env 文件中添加: NODE_AUTH_TOKEN=YOUR_TOKEN"
            echo "2. 在 $NPMRC_PATH 中添加: //npm.pkg.github.com/:_authToken=YOUR_TOKEN"
            echo ""
            echo "详细配置说明请查看: ENV_SETUP.md"
            exit 1
        fi
    else
        echo "✗ 未找到 Token 配置"
        echo ""
        echo "请配置 GitHub Token："
        echo "1. 创建 .env 文件并添加: NODE_AUTH_TOKEN=YOUR_TOKEN"
        echo "2. 或创建 $NPMRC_PATH 并添加配置"
        echo ""
        echo "详细配置说明请查看: ENV_SETUP.md"
        exit 1
    fi
fi

# 询问版本类型
echo ""
echo "选择版本更新类型:"
echo "1. patch (1.0.0 → 1.0.1) - 修复 bug"
echo "2. minor (1.0.0 → 1.1.0) - 新功能"
echo "3. major (1.0.0 → 2.0.0) - 破坏性更改"
echo "4. 跳过版本更新"
read -p "请选择 (1-4): " version_choice

case $version_choice in
    1)
        echo "更新 patch 版本..."
        npm version patch
        ;;
    2)
        echo "更新 minor 版本..."
        npm version minor
        ;;
    3)
        echo "更新 major 版本..."
        npm version major
        ;;
    4)
        echo "跳过版本更新"
        ;;
    *)
        echo "无效选择，已取消"
        exit 1
        ;;
esac

# 构建项目
echo ""
echo "构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "✗ 构建失败"
    exit 1
fi
echo "✓ 构建成功"

# 检查 dist 目录
if [ ! -d "dist" ]; then
    echo "✗ dist 目录不存在"
    exit 1
fi
echo "✓ dist 目录存在"

# 确认发布
echo ""
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "准备发布版本: $CURRENT_VERSION"
read -p "确认发布? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "已取消发布"
    exit 1
fi

# 发布
echo ""
echo "发布到 GitHub Packages..."
npm publish

if [ $? -ne 0 ]; then
    echo "✗ 发布失败"
    exit 1
fi

echo ""
echo "========================================"
echo "  ✓ 发布成功!"
echo "========================================"
echo ""
echo "包名: @irisieason/qz-react"
echo "版本: $CURRENT_VERSION"
echo "查看: https://github.com/irisieason/qz-react/packages"
echo ""

# 询问是否推送 tag
read -p "是否推送 tag 到 GitHub? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "推送 tag..."
    git push --follow-tags
    echo "✓ Tag 已推送"
fi

echo ""
echo "完成!"
