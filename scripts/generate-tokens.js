const fs = require('fs');
const path = require('path');

// 读取 JSON 文件
const jsonPath = path.join(__dirname, '../src/tokens/designtokens/export.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 提取颜色令牌
function extractColors(obj, prefix = '') {
  const colors = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object') {
      if (value.$type === 'color' && value.$value) {
        const colorKey = prefix ? `${prefix}-${key}` : key;
        colors[colorKey] = value.$value;
      } else if (!value.$type) {
        Object.assign(colors, extractColors(value, prefix ? `${prefix}-${key}` : key));
      }
    }
  }
  
  return colors;
}

// 提取间距令牌
function extractSpacing(obj, prefix = '') {
  const spacing = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object') {
      if ((value.$type === 'float' || value.$type === 'number') && 
          (key.includes('spacing') || key.includes('gap') || key.includes('padding') || key.includes('margin'))) {
        const spacingKey = prefix ? `${prefix}-${key}` : key;
        spacing[spacingKey] = typeof value.$value === 'number' ? `${value.$value}px` : value.$value;
      } else if (!value.$type) {
        Object.assign(spacing, extractSpacing(value, prefix ? `${prefix}-${key}` : key));
      }
    }
  }
  
  return spacing;
}

// 提取字体令牌
function extractTypography(obj) {
  const typography = {
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {}
  };
  
  function traverse(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object') {
        if (value.$type && value.$value) {
          if (key.includes('font-family')) {
            typography.fontFamily[key] = value.$value;
          } else if (key.includes('font-size')) {
            typography.fontSize[key] = typeof value.$value === 'number' ? `${value.$value}px` : value.$value;
          } else if (key.includes('font-weight')) {
            typography.fontWeight[key] = value.$value;
          } else if (key.includes('line-height')) {
            typography.lineHeight[key] = value.$value;
          }
        } else if (!value.$type) {
          traverse(value, prefix ? `${prefix}-${key}` : key);
        }
      }
    }
  }
  
  traverse(obj);
  return typography;
}

// 提取阴影令牌
function extractShadows(obj) {
  const shadows = {};
  
  function traverse(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object') {
        if (value.$type === 'shadow' && value.$value) {
          const shadowKey = prefix ? `${prefix}-${key}` : key;
          shadows[shadowKey] = value.$value;
        } else if (!value.$type) {
          traverse(value, prefix ? `${prefix}-${key}` : key);
        }
      }
    }
  }
  
  traverse(obj);
  return shadows;
}

// 生成 TypeScript 文件
function generateTSFile(filename, exportName, data) {
  const content = `export const ${exportName} = ${JSON.stringify(data, null, 2)} as const;\n`;
  fs.writeFileSync(path.join(__dirname, `../src/tokens/${filename}`), content);
  console.log(`Generated ${filename}`);
}

// 主函数
try {
  const colors = extractColors(data);
  const spacing = extractSpacing(data);
  const typography = extractTypography(data);
  const shadows = extractShadows(data);
  
  if (Object.keys(colors).length > 0) {
    generateTSFile('colors.ts', 'colors', colors);
  }
  
  if (Object.keys(spacing).length > 0) {
    generateTSFile('spacing.ts', 'spacing', spacing);
  }
  
  if (Object.keys(typography.fontFamily).length > 0 || 
      Object.keys(typography.fontSize).length > 0) {
    generateTSFile('typography.ts', 'typography', typography);
  }
  
  if (Object.keys(shadows).length > 0) {
    generateTSFile('shadows.ts', 'shadows', shadows);
  }
  
  console.log('\nToken generation complete!');
  console.log(`Colors: ${Object.keys(colors).length} tokens`);
  console.log(`Spacing: ${Object.keys(spacing).length} tokens`);
} catch (error) {
  console.error('Error generating tokens:', error);
  process.exit(1);
}
