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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
// import MetadataCytoscapeChart from '../../cytoscape/MetadataCytoscapeChart';
import Frame from '../Frame';
import FrameStyles from '../Frame.module.scss';

const ServerStatusFrame = ({
  refKey, isPinned, reqString, serverInfo, data,
}) => {
  const [elements, setElements] = useState({ edges: [], nodes: [] });
  const {
    host, port, user, database, graph, status,
  } = serverInfo;

  useEffect(() => {
    if (elements.edges.length === 0 && elements.nodes.length === 0) {
      setElements(data.elements);
    }
  });
  const { t } = useTranslation();
  const setContent = () => {
    if (status === 'connected') {
      return (
        <div className={FrameStyles.FlexContentWrapper}>
          <Row>
            <Col span={6}>
              <h3>{t('serverConnect.connectionTitle')}</h3>
              <p>{t('serverConnect.connectedMessage')}</p>
            </Col>
            <Col span={18}>
              <p>
                {t('serverConnect.connectedUser')}
                &nbsp;
                <strong>{user}</strong>
              </p>
              <p>
                {t('serverConnect.connectedTo')}
                &nbsp;
                <strong>
                  {host}
                  :
                  {port}
                  /
                  {database}
                </strong>
              </p>
              <p>
                {t('serverConnect.graphPathSet')}
                &nbsp;
                <strong>{graph}</strong>
              </p>
            </Col>
          </Row>

          { /* <MetadataCytoscapeChart elements={elements} /> */ }
        </div>
      );
    }
    if (status === 'disconnected') {
      return (
        <>
          <Row>
            <Col span={6}>
              <h3>{t('serverConnect.connectionTitle')}</h3>
              <p>{t('serverConnect.disconnectedMessage')}</p>
            </Col>
            <Col span={18}>
              <p>
                {t('serverConnect.reconnectPrompt')}
                &nbsp;
                <a href="/#" className="badge badge-light">
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    size="lg"
                  />
                  :server connect
                </a>
                {' '}
                {t('serverConnect.reconnectCommand')}
              </p>
            </Col>
          </Row>
        </>
      );
    }
    return null;
  };
  return (
    <Frame
      reqString={reqString}
      isPinned={isPinned}
      refKey={refKey}
    >
      {setContent()}
    </Frame>
  );
};

ServerStatusFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  serverInfo: PropTypes.shape({
    host: PropTypes.string,
    port: PropTypes.string,
    user: PropTypes.string,
    database: PropTypes.string,
    graph: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};

export default ServerStatusFrame;
