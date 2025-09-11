/* eslint-disable react/react-in-jsx-scope */
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
import { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { withTranslation } from 'react-i18next';

class CypherResultTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refKey = props.refKey;
    this.currentTab = props.currentTab;
  }

  render() {
    const { t } = this.props;
    const activeTab = (refKey, tabType) => {
      if (tabType === 'graph') {
        document.getElementById(`${refKey}-${tabType}`).classList.add('selected-frame-tab');
        document.getElementById(`${refKey}-${tabType}`).classList.remove('deselected-frame-tab');
        document.getElementById(`${refKey}-table`).classList.add('deselected-frame-tab');
        document.getElementById(`${refKey}-table`).classList.remove('selected-frame-tab');
      } else if (tabType === 'table') {
        document.getElementById(`${refKey}-${tabType}`).classList.add('selected-frame-tab');
        document.getElementById(`${refKey}-${tabType}`).classList.remove('deselected-frame-tab');
        document.getElementById(`${refKey}-graph`).classList.add('deselected-frame-tab');
        document.getElementById(`${refKey}-graph`).classList.remove('selected-frame-tab');
      }
    };
    return (
      <div style={{
        display: 'flex', flexDirection: 'row', width: '20%', height: '96px', border: 'solid 1px #C4C4C4',
      }}
      >
        <button
          className="btn"
          type="button"
          style={{ width: '50%', fontSize: '14px', color: this.currentTab === 'graph' ? 'var(--tab-active-color)' : 'var(--tab-color)' }}
          onClick={() => activeTab(this.refKey, 'graph')}
        >
          <i className="icon-graph" style={{ fontSize: '25px' }} />
          <br />
          <b style={{ fontSize: '14px' }}>{t('tabs.graph')}</b>
        </button>
        <div
          style={{
            backgroundColor: '#C4C4C4',
            width: '1px',
            height: '76px',
            marginTop: '20px',
          }}
        />
        <button
          className="btn"
          type="button"
          style={{ width: '50%', fontSize: '14px', color: this.currentTab === 'table' ? 'var(--tab-active-color)' : 'var(--tab-color)' }}
          onClick={() => activeTab(this.refKey, 'table')}
        >
          <FontAwesomeIcon icon={faTable} style={{ fontSize: '25px' }} />
          <br />
          <b style={{ fontSize: '14px' }}>{t('tabs.table')}</b>
        </button>
      </div>
    );
  }
}

CypherResultTab.propTypes = {
  refKey: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('cytoscape')(CypherResultTab);
