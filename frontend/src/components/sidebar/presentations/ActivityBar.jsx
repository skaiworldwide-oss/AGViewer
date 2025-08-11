import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import ThemeToggleButton from '../../ThemeToggleButton';

const ActivityBar = () => (
  <div
    style={{
      width: 60,
      height: '100vh',
      position: 'fixed',
      left: 0,
      // background-Color: 'rgba(0, 0, 0, 0.03)',
      backgroundColor: '#e4e4e4ff',
      textAlign: 'center',
      paddingBottom: 12,
    }}
  >
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 20,
        paddingBottom: 20,
      }}
    >
      {/* Theme toggle button */}
      {/* <button
        type="button"
        onClick={() => {}}
        style={{
          borderRadius: '50%',
          width: 40,
          height: 40,
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
      </button> */}
      <ThemeToggleButton />

      {/* Language switcher */}
      <select
        onChange={() => {}}
        defaultValue="en"
        style={{
          background: '#fff',
          color: '#001529',
          border: '1px solid #001529',
          borderRadius: 4,
          padding: 2,
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
  </div>
);

export default ActivityBar;
