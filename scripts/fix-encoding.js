const fs = require('fs');
const path = require('path');

// 需要修复编码的文件列表
const filesToFix = [
  'src/components/Avatar/Avatar.tsx',
  'src/components/Button/Button.tsx',
  'src/components/IconButton/IconButton.tsx',
  'src/components/MenuItem/MenuItem.tsx',
  'src/components/ToggleButton/ToggleButton.tsx',
  'src/components/Tooltip/Tooltip.tsx',
  'src/components/ApplicationHeader/ApplicationHeader.tsx',
  'src/components/ApplicationMenu/ApplicationMenu.tsx',
  'src/components/AvatarButtonMenu/AvatarButtonMenu.tsx',
  'src/components/Cardcontainer/Cardcontainer.tsx',
  'src/components/CategoryFilter/CategoryFilter.tsx',
  'src/components/ContentHeader/ContentHeader.tsx',
  'src/components/DeviceStatusChart/DeviceStatusChart.tsx',
  'src/components/EventItemContent/EventItemContent.tsx',
  'src/components/EventListItem/EventListItem.tsx',
  'src/components/MenuItemList/MenuItemList.tsx',
  'src/components/Slot/Slot.tsx',
  'src/components/StatusHistoryChart/StatusHistoryChart.tsx',
];

console.log('开始修复文件编码...\n');

filesToFix.forEach(filePath => {
  try {
    // 读取文件内容（自动检测编码）
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 以 UTF-8 BOM 格式写回
    fs.writeFileSync(filePath, '\ufeff' + content.replace(/^\ufeff/, ''), 'utf8');
    
    console.log(`✓ 已修复: ${filePath}`);
  } catch (error) {
    console.error(`✗ 修复失败: ${filePath}`, error.message);
  }
});

console.log('\n编码修复完成！');
