// 测试导入
import { Button, Avatar, MenuItem } from './dist/index.esm.js';

console.log('✅ Button:', typeof Button);
console.log('✅ Avatar:', typeof Avatar);
console.log('✅ MenuItem:', typeof MenuItem);

if (typeof Button === 'function' && typeof Avatar === 'function' && typeof MenuItem === 'function') {
  console.log('\n✅ 所有组件导入成功！');
  process.exit(0);
} else {
  console.error('\n❌ 组件导入失败！');
  process.exit(1);
}
