/*
 * Copyright 2020 Bitnine Co., Ltd.
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
import { Layout } from 'antd';

import EditorContainer from '../../contents/containers/Editor';
import Sidebar from '../../sidebar/containers/Sidebar';
import Contents from '../../contents/containers/Contents';
import { loadFromCookie, saveToCookie } from '../../../features/cookie/CookieUtil';

const {
  Sider, Header, Footer,
} = Layout;

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
    // Main layout covering the entire viewport height
    <Layout hasSider style={{ minHeight: '100vh' }}>

      {/* SIDEBAR */}
      <Sider
        width="33vw"
        style={{
          overflow: 'initial',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div
          className="editor-division"
          style={{ height: '100vh', minWidth: '33vw', padding: '0' }}
        >
          <Header
            style={{
              padding: 0,
            }}
          />
          <EditorContainer />
          <Sidebar />
        </div>
      </Sider>
      {/* END SIDEBAR */}

      {/* CONTENTS */}
      <Layout
        style={{
          marginLeft: '33vw',
          // Ensure the content layout stretches to fill the available height
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Contents style={{ flex: 1 }} />

        <Footer
          className="flex-end"
          style={{
            textAlign: 'center',
            position: 'fixed',
            bottom: 0,
            width: 'calc(100% - 33vw)',
            padding: '5px 5px',
          }}
        >
          Copyright © 2024, Bitnine Inc. All Rights Reserved.
          <br />
          <a
            href="https://www.skaiworldwide.com/en-US/resources?filterKey=manual"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check AgensGraph Documentation
          </a>
        </Footer>

      </Layout>
      {/* END CONTENTS */}

    </Layout>
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
