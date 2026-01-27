const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Chinese to English mappings
const replacements = {
  // Categories
  'Figma 属性': 'Figma Props',
  '视觉属性': 'Visual Props',
  '状态': 'State',
  '扩展属性': 'Extended Props',
  
  // Common descriptions
  '是否禁用': 'Whether to disable',
  '是否只读': 'Whether to read-only',
  '是否显示': 'Whether to show',
  '是否展开': 'Whether to expand',
  '是否选中': 'Whether to select',
  '图标名称': 'Icon name',
  '按钮类型': 'Button type',
  '按钮状态': 'Button state',
  '按钮变体类型': 'Button variant type',
  '菜单项文本': 'Menu item text',
  '菜单项变体': 'Menu item variant',
  '菜单项状态': 'Menu item state',
  '标题文本': 'Title text',
  '副标题文本': 'Subtitle text',
  '占位符文本内容': 'Placeholder text content',
  '图表标题': 'Chart title',
  '主标题': 'Main title',
  '副标题': 'Subtitle',
  '子信息': 'Sub info',
  '时间戳': 'Timestamp',
  '严重性指示器颜色': 'Severity indicator color',
  '右侧箭头': 'Right arrow',
  '聚焦状态': 'Focus state',
  '通知徽章': 'Notification badge',
  '通知数量': 'Notification count',
  '返回按钮': 'Back button',
  '操作按钮区域': 'Action buttons area',
  '变体类型': 'Variant type',
  '搜索图标': 'Search icon',
  '清除按钮': 'Clear button',
  '右侧按钮文本': 'Right button text',
  '右上角图标按钮的图标名称': 'Icon name for top-right icon button',
  '左侧图标名称': 'Left icon name',
  '事件来源路径': 'Event source path',
  
  // Slot descriptions
  '子组件插槽': 'Child component slot',
  '可以包含任意组件': 'Can contain any component',
  '用于 Figma Code Connect 设计库绑定': 'For Figma Code Connect design library binding',
  '必须传入一个或多个 MenuItem 组件': 'Must pass one or more MenuItem components',
  '用于插入事件内容组件': 'For inserting event content component',
  '用于插入操作按钮': 'For inserting action buttons',
  '操作按钮区域插槽': 'Action buttons area slot',
  'MenuItem 组件插槽': 'MenuItem component slot',
  'EventItemContent 组件插槽': 'EventItemContent component slot',
  
  // Other common phrases
  '来自 Figma': 'from Figma',
  '来自 ix-icons': 'from ix-icons',
  '扩展属性': 'Extended property',
  '便捷属性': 'Convenience property',
  '会自动设置': 'will automatically set',
  '通过点击交互控制': 'Controlled by click interaction',
  '点击组件选中': 'Click component to select',
  '点击外部取消选中': 'Click outside to deselect',
  '输入内容后': 'after input content',
  '当 disabled=true 或 readOnly=true 时': 'When disabled=true or readOnly=true',
  '组件不会显示占位符': 'component will not show placeholder',
  '与 readOnly 互斥': 'mutually exclusive with readOnly',
  '与 disabled 互斥': 'mutually exclusive with disabled',
  'disabled 优先': 'disabled takes priority',
  '用于主要内容': 'for primary content',
  '用于次要内容': 'for secondary content',
  '圆形/椭圆形': 'circular/oval',
  '按钮尺寸': 'Button size',
  '个图标可选': 'icons available',
  '显示文本': 'show text',
  '是否为': 'Whether is',
  
  // Broken characters (encoding issues)
  '属�?': 'Props',
  '状�?': 'State',
  '�?': '',
};

// Find all .stories.tsx files
const storiesFiles = glob.sync('src/**/*.stories.tsx');

console.log(`Found ${storiesFiles.length} stories files`);

storiesFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // Apply replacements
  Object.entries(replacements).forEach(([chinese, english]) => {
    if (content.includes(chinese)) {
      content = content.split(chinese).join(english);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Fixed: ${file}`);
  }
});

console.log('Done!');
