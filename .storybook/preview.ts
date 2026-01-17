import type { Preview } from "@storybook/react";
import '../src/tokens/tokens.css';
import '../src/components/Button/Button.css';
import '../src/icons'; // Initialize ix-icons

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 深色主题背景配置
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000028', // Siemens iX 深色背景
        },
        {
          name: 'darker',
          value: '#000000',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'gray',
          value: '#23233c',
        },
      ],
    },
    // 设置深色主题
    theme: 'dark',
  },
};

export default preview;
