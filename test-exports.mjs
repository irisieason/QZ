// 详细测试导出
import * as AllExports from './dist/index.esm.js';

console.log('=== 所有导出 ===');
console.log('导出的键:', Object.keys(AllExports).sort());
console.log('\n=== 组件检查 ===');

const components = [
  'Button', 'Avatar', 'MenuItem', 'IconButton', 
  'ApplicationMenu', 'CategoryFilter', 'Tooltip'
];

components.forEach(name => {
  const component = AllExports[name];
  console.log(`${name}:`, {
    type: typeof component,
    isFunction: typeof component === 'function',
    hasDisplayName: component?.displayName,
    name: component?.name
  });
});

console.log('\n=== CSS 检查 ===');
console.log('是否有 style.css:', AllExports.default ? 'Yes' : 'No');

// 检查是否有意外的 default export
if (AllExports.default) {
  console.log('⚠️  发现 default export:', AllExports.default);
}
