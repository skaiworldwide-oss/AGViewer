import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import PropTypes from 'prop-types';

const lightTheme = { name: 'light', background: '#fff', color: '#000' };
const darkTheme = { name: 'dark', background: '#333', color: '#fff' };
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const [fullScreenFrameId, setFullScreenFrameId] = useState(null);
  const setFrameFullScreen = (frameId, isFullScreen) => {
    setFullScreenFrameId(isFullScreen ? frameId : null);
  };
  const isFrameFullScreen = (frameId) => fullScreenFrameId === frameId;

  const toggleTheme = () => {
    const newTheme = theme.name === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
  };
  useEffect(() => {
    document.body.classList.toggle('dark', theme.name === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        fullScreenFrameId,
        setFrameFullScreen,
        isFrameFullScreen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
