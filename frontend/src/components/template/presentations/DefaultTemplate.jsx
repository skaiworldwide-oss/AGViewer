/*
 * Copyright 2025 SKAI Worldwide Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import { Layout } from 'antd';

import EditorContainer from '../../contents/containers/Editor';
import Sidebar from '../../sidebar/containers/Sidebar';
import Contents from '../../contents/containers/Contents';
import { loadFromCookie, saveToCookie } from '../../../features/cookie/CookieUtil';
import logoImage from './logo.png';
import ActivityBar from '../../sidebar/presentations/ActivityBar';
import ResizableSplitLayout from '../../splitlayout/ResizableSplitLayout';
import '../../splitlayout/split-pane.css';

const HeaderStyles = {
  height: '64px',
  color: 'rgba(0, 0, 0, 0.85)',
  lineHeight: '64px',
  background: '#001529',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const FooterStyles = {
  color: 'var(--primary-color)',
  backgroundColor: 'var(--footer-bg-color)',
  fontSize: '14px',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  right: 0,
  width: '67%',
  padding: '5px 5px',
  zIndex: 1000,
};
const DefaultTemplate = ({
  theme,
  maxNumOfFrames,
  maxNumOfHistories,
  maxDataOfGraph,
  maxDataOfTable,
  changeSettings,
}) => {
  const dispatch = useDispatch();
  const [stateValues] = useState({
    theme,
    maxNumOfFrames,
    maxNumOfHistories,
    maxDataOfGraph,
    maxDataOfTable,
  });

  useEffect(() => {
    let isChanged = false;
    const cookieState = {
      theme,
      maxNumOfFrames,
      maxNumOfHistories,
      maxDataOfGraph,
      maxDataOfTable,
    };

    Object.keys(stateValues).forEach((key) => {
      let fromCookieValue = loadFromCookie(key);

      if (fromCookieValue !== undefined && key !== 'theme') {
        fromCookieValue = parseInt(fromCookieValue, 10);
      }

      if (fromCookieValue === undefined) {
        saveToCookie(key, stateValues[key]);
      } else if (fromCookieValue !== stateValues[key]) {
        cookieState[key] = fromCookieValue;
        isChanged = true;
      }
    });

    if (isChanged) {
      dispatch(() => changeSettings(Object.assign(stateValues, cookieState)));
    }
  });

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Fixed Activity Bar */}
      <div style={{ width: '60px', flexShrink: 0 }}>
        <ActivityBar />
      </div>

      {/* Resizable Split Pane between Sidebar and Main Content */}
      <ResizableSplitLayout
        minSize={330}
        defaultSize="calc(33% - 30px)"
        maxSize={900}
        primary="first"
        style={{ flex: 1, marginLeft: '60px' }}
      >
        {/* SIDEBAR */}
        <div
          className="editor-division"
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <header style={HeaderStyles}>
            <img
              src={logoImage}
              alt="AgensGraph Logo"
              style={{ maxHeight: '100%', maxWidth: '100%', height: 'auto' }}
            />
          </header>
          <EditorContainer />
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Contents style={{ flex: 1 }} />
          <footer className="flex-end" style={FooterStyles}>
            Copyright © 2025 SKAI Worldwide Co., Ltd. All Rights Reserved.
            <br />
            <a
              href="https://www.skaiworldwide.com/en-US/resources?filterKey=manual"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check AgensGraph Documentation
            </a>
          </footer>
        </div>
      </ResizableSplitLayout>
    </div>
  );
};

DefaultTemplate.propTypes = {
  theme: PropTypes.string.isRequired,
  maxNumOfFrames: PropTypes.number.isRequired,
  maxNumOfHistories: PropTypes.number.isRequired,
  maxDataOfGraph: PropTypes.number.isRequired,
  maxDataOfTable: PropTypes.number.isRequired,
  changeSettings: PropTypes.func.isRequired,
};

export default DefaultTemplate;
