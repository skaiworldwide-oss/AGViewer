import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDice, faTable, faTree, faBullseye, faAtom,
  faLink, faBrain, faSitemap, faLayerGroup,
  faRetweet, faCircleNotch, faWifi,
} from '@fortawesome/free-solid-svg-icons';

export const layoutOptions = [
  { label: 'Random', value: 'random', icon: faDice },
  { label: 'Grid', value: 'grid', icon: faTable },
  { label: 'Breadth-First', value: 'breadthFirst', icon: faTree },
  { label: 'Concentric', value: 'concentric', icon: faBullseye },
  { label: 'Cola', value: 'cola', icon: faAtom },
  { label: 'Cose', value: 'cose', icon: faLink },
  { label: 'Cose-Bilkent', value: 'coseBilkent', icon: faBrain },
  { label: 'Dagre', value: 'dagre', icon: faSitemap },
  { label: 'Klay', value: 'klay', icon: faLayerGroup },
  { label: 'Euler', value: 'euler', icon: faRetweet },
  {
    label: 'Avsdf', value: 'avsdf', icon: faCircleNotch, spin: true,
  },
  { label: 'Spread', value: 'spread', icon: faWifi },
];

const CytoscapeLayoutDropdown = ({
  selectedLayout,
  onChange,
  className = '',
  id = 'selectLayout',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = layoutOptions.find((option) => option.value === selectedLayout);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (event, option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(option);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`layout-dropdown ${className} `}
      style={{ position: 'relative' }}
    >
      <button
        id={id}
        type="button"
        className="custom-select custom-select-sm layout-select"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0.25rem 0.5rem',
          fontSize: '0.875rem',
          fontWeight: '400',
          lineHeight: '1.5',
          color: 'var(--dropdown-text-color)',
          backgroundColor: 'var(--dropdown-bg-color)',
          border: '1px solid var(--dropdown-border-color)',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          minWidth: '140px',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {selectedOption && (
            <FontAwesomeIcon
              icon={selectedOption.icon}
              spin={selectedOption.spin}
              style={{ fontSize: '0.875rem' }}
            />
          )}
          {selectedOption?.label || 'Select Layout'}
        </span>
      </button>

      {isOpen && (
        <div
          className="layout-dropdown-menu"
          role="listbox"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '0',
            right: '0',
            zIndex: 1000,
            backgroundColor: '#fff',
            border: '1px solid var(--dropdown-border-color)',
            borderRadius: '0.25rem',
            boxShadow: 'var(--dropdown-box-shadow)',
            marginBottom: '0.125rem',
            // maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {layoutOptions.map((option) => (
            <div
              key={option.value}
              role="option"
              tabIndex={0}
              aria-selected={option.value === selectedLayout}
              className={`layout-dropdown-item ${option.value === selectedLayout ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                color: 'var(--dropdown-text-color)',
                backgroundColor: option.value === selectedLayout ? 'var(--dropdown-selected-bg)' : 'var(--dropdown-unselected-bg)',
                borderBottom: 'var(--dropdown-item-border-bottom)',
                transition: 'background-color 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (option.value !== selectedLayout) {
                  e.target.style.backgroundColor = 'var(--dropdown-hover-bg)';
                }
              }}
              onMouseLeave={(e) => {
                if (option.value !== selectedLayout) {
                  e.target.style.backgroundColor = 'var(--dropdown-unselected-bg)';
                }
              }}
            >
              <FontAwesomeIcon
                icon={option.icon}
                spin={option.spin}
                style={{ fontSize: '0.875rem', minWidth: '14px' }}
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CytoscapeLayoutDropdown.propTypes = {
  selectedLayout: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};
CytoscapeLayoutDropdown.defaultProps = {
  className: '',
  id: 'selectLayout',
};

export default CytoscapeLayoutDropdown;
