import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图�?
addIcons(allIcons);

export const AvatarExample: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<'placeholder' | 'initials' | 'image'>('placeholder');
  const [initials, setInitials] = useState('JD');
  const [imageUrl, setImageUrl] = useState('https://i.pravatar.cc/150?img=1');

  const users = [
    { id: 1, name: 'John Doe', initials: 'JD', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', initials: 'JS', image: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Bob Wilson', initials: 'BW', image: null },
    { id: 4, name: 'Alice Brown', initials: 'AB', image: null },
    { id: 5, name: 'Charlie Davis', initials: 'CD', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 6, name: 'Unknown User', initials: null, image: null },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '32px' }}>Avatar Component Examples</h1>

      {/* 交互式演�?*/}
      <div style={{ marginBottom: '48px', padding: '24px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '24px' }}>Interactive Demo</h2>
        
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Mode:
              </label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value as any)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
              >
                <option value="placeholder">Placeholder (Default)</option>
                <option value="initials">Initials</option>
                <option value="image">Image</option>
              </select>
            </div>

            {selectedMode === 'initials' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Initials:
                </label>
                <input
                  type="text"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.slice(0, 2).toUpperCase())}
                  maxLength={2}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                  placeholder="JD"
                />
              </div>
            )}

            {selectedMode === 'image' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Image URL:
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                  placeholder="https://..."
                />
              </div>
            )}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px', backgroundColor: '#000028', borderRadius: '8px' }}>
            <p style={{ color: 'white', marginBottom: '16px', fontSize: '14px' }}>Preview:</p>
            <Avatar
              text={initials}
              initials={selectedMode === 'initials'}
              src={selectedMode === 'image' ? imageUrl : undefined}
            />
          </div>
        </div>
      </div>

      {/* 用户列表示例 */}
      <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '24px' }}>User List Example</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                backgroundColor: '#000028',
                borderRadius: '8px',
              }}
            >
              <Avatar
                text={user.initials || 'U'}
                initials={!user.image && !!user.initials}
                src={user.image || undefined}
                alt={user.name}
              />
              <div>
                <p style={{ margin: 0, color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                  {user.name}
                </p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                  {user.image ? 'With photo' : user.initials ? 'With initials' : 'Placeholder'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarExample;
