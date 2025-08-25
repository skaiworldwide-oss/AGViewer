import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import ThemeToggleButton from '../../ThemeToggleButton';
import LanguageSwitcher from '../../localization/LanguageSwitcher';

const ActivityBar = () => (
  <div
    style={{
      width: 60,
      height: '100vh',
      position: 'fixed',
      left: 0,
      // background-Color: 'rgba(0, 0, 0, 0.03)',
      backgroundColor: 'var(--activitybar-bg-color)',
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

      {/* Language switcher */}
      <LanguageSwitcher />

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

      {/* Settings button */}
      <button
        type="button"
        onClick={() => {}}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--activitybar-text-color)',
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
