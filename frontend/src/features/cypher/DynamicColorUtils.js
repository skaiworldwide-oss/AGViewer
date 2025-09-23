/* eslint no-bitwise: "off" */
import { useState } from 'react';
import { nodeLabelColors, edgeLabelColors } from './CypherUtil';

const useDynamicColors = (labelType) => {
  const [, forceUpdate] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [newColor, setNewColor] = useState('#000000');

  // Helper function to ensure color values stay within 0-255 range
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Function to calculate brightness of a color
  const getBrightness = (hex) => {
    const hexValue = hex.replace('#', '');
    const r = parseInt(hexValue.substr(0, 2), 16);
    const g = parseInt(hexValue.substr(2, 2), 16);
    const b = parseInt(hexValue.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  // Function to calculate the appropriate font color based on brightness
  const getFontColor = (bgColor) => {
    const brightness = getBrightness(bgColor);
    return brightness > 128 ? '#2A2C34' : '#FFF';
  };

  // Helper function to lighten or darken a color
  const lightenDarkenColor = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = (num >> 16) + percent;
    const g = ((num >> 8) & 0x00FF) + percent;
    const b = (num & 0x0000FF) + percent;

    return `#${(0x1000000 + (clamp(r, 0, 255) << 16) + (clamp(g, 0, 255) << 8) + clamp(b, 0, 255)).toString(16).slice(1)}`;
  };

  // Function to generate an appropriate border color based on brightness
  const getBorderColor = (bgColor) => {
    const brightness = getBrightness(bgColor);

    // Adjust the border color to be darker or lighter based on background brightness
    if (brightness > 128) {
      return lightenDarkenColor(bgColor, -50); // Darken by 50 units
    }

    return lightenDarkenColor(bgColor, 50); // Lighten by 50 units
  };

  // Add a new color directly into global arrays
  const addColor = (selectedColor = null) => {
    const colorToAdd = selectedColor || newColor;
    const targetArray = labelType === 'node' ? nodeLabelColors : edgeLabelColors;
    const nextIndex = targetArray.length;

    const fontColor = getFontColor(colorToAdd);
    const borderColor = getBorderColor(colorToAdd);

    const newColorObj = {
      color: colorToAdd,
      borderColor,
      fontColor,
      nodeLabels: new Set([]),
      edgeLabels: new Set([]),
      index: nextIndex,
      isDynamic: true,
    };

    // check if dynamic color already exists
    const existingIndex = targetArray.findIndex((c) => c.isDynamic);
    if (existingIndex !== -1) {
      targetArray[existingIndex] = newColorObj; // overwrite
    } else {
      targetArray.push(newColorObj); // add new
    }
    forceUpdate((x) => x + 1); // force re-render so UI updates
    setPickerOpen(false);
    setNewColor('#000000');
  };

  return {
    colors: labelType === 'node' ? nodeLabelColors : edgeLabelColors,
    pickerOpen,
    setPickerOpen,
    newColor,
    setNewColor,
    addColor,
  };
};

export default useDynamicColors;
