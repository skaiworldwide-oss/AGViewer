import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ko', label: 'KO' },
  { code: 'zh', label: 'ZH' },
  { code: 'es', label: 'ES' },
  { code: 'ar', label: 'AR' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation(); // Removed unused 't'
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '1rem',
        color: '#333',
        userSelect: 'none',
      }}
    >
      <button
        type="button"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          background: 'transparent',
          border: '0px solid #ccc',
          borderRadius: '4px',
          padding: '0.3rem 0.8rem',
          cursor: 'pointer',
          minWidth: '40px',
          textAlign: 'left',
          color: 'var(--activitybar-text-color)',
          fontWeight: '500',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {currentLang.label}
        <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>{open ? '▼' : '▲'}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          style={{
            listStyle: 'none',
            margin: 0,
            padding: '0.25rem 0',
            position: 'absolute',
            bottom: 'calc(100% + 4px)',
            left: 1,
            background: 'transparent',
            border: '0px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            minWidth: '60px',
            zIndex: 10,
          }}
        >
          {languages
            .filter((l) => l.code !== currentLang.code)
            .map((lang) => (
              <li
                key={lang.code}
                role="option"
                aria-selected="false"
                tabIndex={0}
                onClick={() => changeLanguage(lang.code)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    changeLanguage(lang.code);
                  }
                }}
                style={{
                  padding: '0.4rem 0.8rem',
                  cursor: 'pointer',
                  color: 'var(--activitybar-text-color)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {lang.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
