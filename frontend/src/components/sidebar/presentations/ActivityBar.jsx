import React from 'react';
import { Layout } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCog } from '@fortawesome/free-solid-svg-icons';

const { Sider } = Layout;

const ActivityBar = () => (
  <Sider
    width={60}
    style={{
      height: '100vh',
      position: 'fixed',
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      textAlign: 'center',
      paddingBottom: '12px',
    }}
  >
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '20px',
        paddingBottom: '20px',
      }}
    >
      {/* Theme toggle button */}
      <button
        type="button"
        onClick={() => {}}
        style={{
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          border: '1px solid #001529',
          color: '#001529',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        title="Toggle Theme"
        aria-label="Toggle Theme"
      >
        <FontAwesomeIcon icon={faSun} />
      </button>

      {/* Language switcher */}
      <select
        onChange={() => {}}
        defaultValue="en"
        style={{
          background: '#fff',
          color: '#001529',
          border: '1px solid #001529',
          borderRadius: '4px',
          padding: '2px',
          fontSize: '0.8rem',
          cursor: 'pointer',
        }}
        title="Change Language"
        aria-label="Change Language"
      >
        <option value="en">🇺🇸</option>
        <option value="ko">🇰🇷</option>
      </select>

      {/* Settings button */}
      <button
        type="button"
        onClick={() => {}}
        style={{
          background: 'none',
          border: 'none',
          color: '#001529',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
        title="Settings"
        aria-label="Settings"
      >
        <FontAwesomeIcon icon={faCog} />
      </button>
    </div>
  </Sider>
);

export default ActivityBar;
