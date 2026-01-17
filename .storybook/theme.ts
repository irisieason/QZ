import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  
  // 品牌颜色
  brandTitle: 'Siemens iX Design System',
  brandUrl: 'https://ix.siemens.io',
  brandTarget: '_blank',
  
  // 颜色配置
  colorPrimary: '#00cccc',
  colorSecondary: '#00ffb9',
  
  // UI 颜色
  appBg: '#000028',
  appContentBg: '#000028',
  appBorderColor: '#23233c',
  appBorderRadius: 4,
  
  // 文本颜色
  textColor: '#ffffff',
  textInverseColor: '#000028',
  
  // 工具栏颜色
  barTextColor: '#ffffff',
  barSelectedColor: '#00cccc',
  barBg: '#23233c',
  
  // 表单颜色
  inputBg: '#23233c',
  inputBorder: '#37374d',
  inputTextColor: '#ffffff',
  inputBorderRadius: 4,
});
