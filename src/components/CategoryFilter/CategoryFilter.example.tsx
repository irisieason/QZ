import React, { useState } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

export const CategoryFilterExample: React.FC = () => {
  const [controlledValue, setControlledValue] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    // 模拟搜索结果
    const mockResults = [
      'React', 'TypeScript', 'JavaScript', 'CSS', 'HTML',
      'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL'
    ].filter(item => 
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(mockResults);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>CategoryFilter Examples</h2>
      
      <div style={{ marginBottom: '40px' }}>
        <h3>Basic States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label>Default State:</label>
            <CategoryFilter placeholderText="Search categories..." />
          </div>
          
          <div>
            <label>Hover State:</label>
            <CategoryFilter placeholderText="Hover state" />
          </div>
          
          <div>
            <label>Focused State:</label>
            <CategoryFilter placeholderText="Focused state" />
          </div>
          
          <div>
            <label>ReadOnly State:</label>
            <CategoryFilter readOnly={true} placeholderText="Read only" />
          </div>
          
          <div>
            <label>Disabled State:</label>
            <CategoryFilter disabled={true} placeholderText="Disabled" />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Without Search Icon</h3>
        <CategoryFilter 
          searchIcon={false} 
          placeholderText="No search icon" 
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Controlled Component</h3>
        <CategoryFilter
          value={controlledValue}
          onChange={(value) => setControlledValue(value)}
          placeholderText="Type something..."
        />
        <p>Current value: {controlledValue}</p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Uncontrolled Component</h3>
        <CategoryFilter
          defaultValue="Initial value"
          placeholderText="Uncontrolled input"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>With Search Functionality</h3>
        <CategoryFilter
          placeholderText="Search technologies..."
          onSearch={handleSearch}
          onChange={(value) => {
            if (!value) {
              setSearchResults([]);
            }
          }}
        />
        {searchResults.length > 0 && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          }}>
            <h4>Search Results:</h4>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Custom Styling</h3>
        <CategoryFilter
          className="custom-filter"
          placeholderText="Custom styled filter"
          style={{ 
            '--color-std-border': '#ff6b6b',
            '--color-dynamic': '#4ecdc4'
          } as React.CSSProperties}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Event Handling</h3>
        <CategoryFilter
          placeholderText="Try typing and pressing Enter..."
          onChange={(value, event) => {
            console.log('Value changed:', value, event);
          }}
          onFocus={(event) => {
            console.log('Input focused:', event);
          }}
          onBlur={(event) => {
            console.log('Input blurred:', event);
          }}
          onSearch={(value) => {
            console.log('Search triggered:', value);
            alert(`Searching for: ${value}`);
          }}
        />
        <p><em>Check console for event logs</em></p>
      </div>
    </div>
  );
};