import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import './split-pane.css';

const ResizableSplitLayout = ({
  children,
  minSize,
  maxSize,
  defaultSize,
  primary,
  split,
  style,
}) => (
  <SplitPane
    split={split}
    minSize={minSize}
    maxSize={maxSize}
    defaultSize={defaultSize}
    primary={primary}
    style={{ height: '100vh', ...style }}
  >
    {children}
  </SplitPane>
);

ResizableSplitLayout.propTypes = {
  children: PropTypes.node.isRequired,
  minSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  primary: PropTypes.oneOf(['first', 'second']),
  split: PropTypes.oneOf(['vertical', 'horizontal']),
  style: PropTypes.shape({}),
};

ResizableSplitLayout.defaultProps = {
  minSize: 300,
  maxSize: 800,
  defaultSize: 500,
  primary: 'first',
  split: 'vertical',
  style: {},
};

export default ResizableSplitLayout;
