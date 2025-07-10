import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = ({ className, style }) => {
  const { toggleTheme, theme } = useTheme();

  const buttonStyle = {
    position: 'fixed',
    top: 10,
    right: 10,
    zIndex: 2000,
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    ...style,
  };

  const isLight = theme.name === 'light';

  return (
    <Button
      variant={isLight ? 'dark' : 'light'}
      size="sm"
      onClick={toggleTheme}
      className={className}
      style={buttonStyle}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
    >
      {isLight ? '🌙' : '☀️'}
    </Button>
  );
};

ThemeToggleButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

ThemeToggleButton.defaultProps = {
  className: '',
  style: {},
};

export default ThemeToggleButton;
