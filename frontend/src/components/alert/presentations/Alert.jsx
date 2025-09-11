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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';

const SingleAlert = ({
  alertKey,
  alertName,
  errorMessage,
  setCommand,
  removeAlert,
}) => {
  const dispatch = useDispatch();

  const setAlertConnect = (e, command) => {
    e.preventDefault();
    dispatch(() => {
      setCommand(command);
    });
  };

  const clearAlert = () => {
    dispatch(() => {
      removeAlert(alertKey);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clearAlert();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  const { t } = useTranslation();
  if (alertName === 'NoticeServerDisconnected') {
    return (
      <Alert
        variant="warning"
        afterClose={() => clearAlert()}
        showIcon
        closable
        message={t('alerts.noticeServerDisconnected.title')}
        description={(
          <p>
            {t('alerts.noticeServerDisconnected.description').split('{command}')[0]}

            <button type="button" className="badge badge-light" onClick={(e) => setAlertConnect(e, ':server connect')}>

              <FontAwesomeIcon
                icon={faPlayCircle}
                size="lg"
              />
              :server connect
            </button>
            {t('alerts.noticeServerDisconnected.description').split('{command}')[1]}
          </p>
        )}
      />
    );
  }
  if (alertName === 'NoticeServerConnected') {
    return (
      <Alert
        type="success"
        afterClose={() => clearAlert()}
        showIcon
        closable
        message={t('alerts.noticeServerConnected.title')}
        description={(
          <p>
            {t('alerts.noticeServerConnected.description').split('{command}')[0]}
            <a href="/#" className="badge badge-light" onClick={(e) => setAlertConnect(e, ':server status')}>
              <FontAwesomeIcon
                icon={faPlayCircle}
                size="lg"
              />
              :server status
            </a>
            {t('alerts.noticeServerConnected.description').split('{command}')[1]}
          </p>
        )}
      />
    );
  }
  if (alertName === 'ErrorServerConnectFail') {
    return (
      <Alert
        type="error"
        afterClose={() => clearAlert()}
        showIcon
        closable
        message={t('alerts.errorServerConnectFail.title')}
        description={(
          <>
            <p>{t('alerts.errorServerConnectFail.description')}</p>
            {errorMessage}
          </>
        )}
      />
    );
  }
  if (alertName === 'ErrorNoDatabaseConnected') {
    return (
      <Alert
        type="error"
        showIcon
        closable
        afterClose={() => clearAlert()}
        message={t('alerts.ErrorNoDatabaseConnected.title')}
        description={
        (
          <>
            <p>
              {t('alerts.ErrorNoDatabaseConnected.description').split('{command}')[0]}
              <a href="/#" className="badge badge-light" onClick={(e) => setAlertConnect(e, ':server connect')}>
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  size="lg"
                />
                :server connect
              </a>
              {t('alerts.ErrorNoDatabaseConnected.description').split('{command}')[1]}
            </p>
            {errorMessage}
          </>
        )
      }
      />
    );
  }
  if (alertName === 'ErrorMetaFail') {
    return (
      <Alert
        type="error"
        afterClose={() => clearAlert()}
        message={t('alerts.ErrorMetaFail.title')}
        showIcon
        closable
        description={(
          <p>
            {t('alerts.ErrorMetaFail.description')}
          </p>
        )}
      />
    );
  }
  if (alertName === 'ErrorCypherQuery') {
    return (
      <Alert
        type="error"
        afterClose={() => clearAlert()}
        showIcon
        closable
        message={t('alerts.ErrorCypherQuery.title')}
        description={(
          <p>
            {t('alerts.ErrorCypherQuery.description')}
          </p>
        )}
      />
    );
  }
  if (alertName === 'ErrorPlayLoadFail') {
    return (
      <Alert
        type="error"
        afterClose={() => clearAlert()}
        showIcon
        closable
        message={t('alerts.errorPlayLoadFail.title')}
        description={(
          <p>
            description=
            {t('alerts.errorPlayLoadFail.description', { error: errorMessage })}
          </p>
        )}
      />
    );
  }
  if (alertName === 'NoticeAlreadyConnected') {
    return (
      <Alert
        type="info"
        afterClose={() => clearAlert()}
        showIcon
        closable
        message={t('alerts.noticeAlreadyConnected.title')}
        description={(
          <p>
            {t('alerts.noticeAlreadyConnected.description').split('{command}')[0]}
            <a
              href="/#"
              className="badge badge-light"
              onClick={(e) => setAlertConnect(e, ':server disconnect')}
            >
              <FontAwesomeIcon
                icon={faPlayCircle}
                size="lg"
              />
              :server disconnect
            </a>
            {t('alerts.noticeAlreadyConnected.description').split('{command}')[1]}
          </p>
        )}
      />
    );
  }
  return (<></>);
};
SingleAlert.propTypes = {
  alertKey: PropTypes.string.isRequired,
  alertName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setCommand: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

export default SingleAlert;
