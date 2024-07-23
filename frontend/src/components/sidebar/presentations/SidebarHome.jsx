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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

import uuid from 'react-uuid';
import { connect, useDispatch } from 'react-redux';

import { SubLabelLeft, SubLabelRight } from './SidebarComponents';
import { NewNodeModal } from '../../modals/presentations/NewNodeModal';
import { NewEdgeModal } from '../../modals/presentations/NewEdgeModal';

const genLabelQuery = (eleType, labelName, database) => {
  function age() {
    if (eleType === 'node') {
      if (labelName === '*') {
        return `SELECT * from cypher('${database.graph}', $$
          MATCH (V)
          RETURN V
$$) as (V agtype);`;
      }
      return `SELECT * from cypher('${database.graph}', $$
          MATCH (V:${labelName})
          RETURN V
$$) as (V agtype);`;
    }
    if (eleType === 'edge') {
      if (labelName === '*') {
        return `SELECT * from cypher('${database.graph}', $$
          MATCH (V)-[R]-(V2)
          RETURN V,R,V2
$$) as (V agtype, R agtype, V2 agtype);`;
      }
      return `SELECT * from cypher('${database.graph}', $$
          MATCH (V)-[R:${labelName}]-(V2)
          RETURN V,R,V2
$$) as (V agtype, R agtype, V2 agtype);`;
    }
    return '';
  }
  function agens() {
    if (eleType === 'node') {
      if (labelName === '*') {
        return 'MATCH (V) RETURN V';
      }
      return `MATCH (V) WHERE LABEL(V) = '${labelName}' RETURN V`;
    }
    if (eleType === 'edge') {
      if (labelName === '*') {
        return 'MATCH (V)-[R]->(V2) RETURN *';
      }
      return `MATCH (V)-[R]->(V2) WHERE LABEL(R) = '${labelName}' RETURN *`;
    }
    return '';
  }
  if (database.flavor === 'AGE') {
    return age();
  }
  if (database.flavor === 'AGENS') {
    return agens();
  }
  return '';
};

const genPropQuery = (eleType, propertyName) => {
  if (eleType === 'v') {
    return `MATCH (V) WHERE V.'${propertyName}' IS NOT NULL RETURN V`;
  }
  if (eleType === 'e') {
    return `MATCH (V)-[R]->(V2) WHERE R.'${propertyName}' IS NOT NULL RETURN *`;
  }
  return '';
};

const NodeList = ({ nodes, setCommand }) => {
  const [open, setOpen] = useState(false);

  let list;
  if (nodes && nodes.length > 0) {
    list = nodes.map((item) => (
      <NodeItems
        key={uuid()}
        label={item.label}
        cnt={item.cnt}
        setCommand={setCommand}
      />
    ));
    return (
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          height: 'auto',
          overflowY: 'auto',
          marginTop: '12px',
        }}
        >
          {list}
        </div>

        <Button
          className="node-item"
          type="button"
          onClick={() => setOpen(true)}
          style={{ marginTop: '10px' }}
        >
          Add New Node (+)
        </Button>
        <NewNodeModal
          open={open}
          setOpen={setOpen}
          setCommand={setCommand}
        />
      </div>
    );
  }

  return null;
};
NodeList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    cnt: PropTypes.number,
  })).isRequired,
  setCommand: PropTypes.func.isRequired,
};

const NodeItems = connect((state) => ({
  database: state.database,
}), {})(
  ({
    label, cnt, setCommand, database,
  }) => (
    <button
      type="button"
      className="node-item"
      onClick={() => setCommand(genLabelQuery('node', label, database))}
    >
      {label}
      (
      {cnt}
      )
    </button>
  ),
);
NodeItems.propTypes = {
  database: PropTypes.shape({
    flavor: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  cnt: PropTypes.number.isRequired,
  setCommand: PropTypes.func.isRequired,
};

const EdgeList = ({ edges, setCommand }) => {
  const [open, setOpen] = useState(false);
  let list;
  if (edges && edges.length > 0) {
    list = edges.map((item) => (
      <EdgeItems
        key={uuid()}
        label={item.label}
        cnt={item.cnt}
        setCommand={setCommand}
      />
    ));
    return (
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          height: 'auto',
          overflowY: 'auto',
          marginTop: '12px',
        }}
        >
          {list}
        </div>
        <Button
          className="edge-item"
          type="button"
          onClick={() => setOpen(true)}
          style={{ marginTop: '10px' }}
        >
          Add New Edge (+)
        </Button>
        <NewEdgeModal
          open={open}
          setOpen={setOpen}
          setCommand={setCommand}
        />
      </div>
    );
  }

  return null;
};
EdgeList.propTypes = {
  edges: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    cnt: PropTypes.number,
  })).isRequired,
  setCommand: PropTypes.func.isRequired,
};

const EdgeItems = connect((state) => ({
  database: state.database,
}), {})(({
  label, cnt, setCommand, database,
}) => (
  <button
    type="button"
    className="edge-item"
    onClick={() => setCommand(genLabelQuery('edge', label, database))}
  >
    {label}
    (
    {cnt}
    )
  </button>
));
EdgeItems.propTypes = {
  database: PropTypes.shape({
    flavor: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  cnt: PropTypes.number.isRequired,
  setCommand: PropTypes.func.isRequired,
};

const PropertyList = ({ propertyKeys, setCommand }) => {
  let list;
  if (propertyKeys) {
    list = propertyKeys.map((item) => (
      <PropertyItems
        key={uuid()}
        propertyName={item.key}
        keyType={item.key_type}
        setCommand={setCommand}
      />
    ));
    return (
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          height: 'auto',
          overflowY: 'auto',
          marginTop: '12px',
        }}
        >
          {list}
        </div>
      </div>
    );
  }

  return null;
};
PropertyList.propTypes = {
  propertyKeys: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    key_type: PropTypes.string,
  })).isRequired,
  setCommand: PropTypes.func.isRequired,
};

const PropertyItems = ({ propertyName, keyType, setCommand }) => (
  <button
    type="button"
    className={`${keyType === 'v' ? 'property-item' : 'property-item'} property-item`}
    onClick={() => setCommand(genPropQuery(keyType, propertyName))}
  >
    {propertyName}
  </button>
);
PropertyItems.propTypes = {
  propertyName: PropTypes.string.isRequired,
  keyType: PropTypes.string.isRequired,
  setCommand: PropTypes.func.isRequired,
};

const ConnectionConfirmation = ({ userName, roleName }) => (
  <div>
    <h6>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Username :" classes="col-sm-6" />
        <SubLabelLeft label={userName} classes="col-sm-6" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Roles :" classes="col-sm-6" />
        <SubLabelLeft label={roleName} classes="col-sm-6" />
      </div>
    </h6>
  </div>
);

ConnectionConfirmation.propTypes = {
  userName: PropTypes.string.isRequired,
  roleName: PropTypes.string.isRequired,
};

const DBMSText = ({ dbname, graph }) => (
  <div>
    <h6>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Databases :" classes="col-sm-6" />
        <SubLabelLeft label={dbname} classes="col-sm-6" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Graph Path :" classes="col-sm-6" />
        <SubLabelLeft label={graph} classes="col-sm-6" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Information :" classes="col-sm-6" />
        <SubLabelLeft label="-" classes="col-sm-6" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Query List :" classes="col-sm-6" />
        <SubLabelLeft label="-" classes="col-sm-6" />
      </div>
    </h6>
  </div>
);

DBMSText.propTypes = {
  dbname: PropTypes.string.isRequired,
  graph: PropTypes.string.isRequired,
};

const SidebarHome = ({
  edges,
  nodes,
  propertyKeys,
  setCommand,
  command,
  trimFrame,
  addFrame,
  getMetaData,
}) => {
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const requestDisconnect = () => {
    const refKey = uuid();
    dispatch(() => trimFrame('ServerDisconnect'));
    dispatch(() => addFrame(command, 'ServerDisconnect', refKey));
  };

  const refreshSidebarHome = () => {
    getMetaData();
  };

  return (
    <div className="sidebar-home">
      <div className="sidebar sidebar-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

        <div className="form-group sidebar-item" style={{ width: '100%', margin: 0, paddingLeft: '10px' }}>
          <b>Find nodes with label:</b>
          <br />
          <NodeList nodes={nodes} setCommand={setCommand} />
        </div>
        <div className="form-group sidebar-item" style={{ width: '100%', margin: 0, paddingLeft: '10px' }}>
          <b>Find edges with label:</b>
          <br />
          <EdgeList edges={edges} setCommand={setCommand} />
        </div>
        <div className="form-group sidebar-item" style={{ width: '100%', margin: 0, paddingLeft: '10px' }}>
          <b>Find itens with properties:</b>
          <br />
          <PropertyList propertyKeys={propertyKeys} setCommand={setCommand} />
        </div>

        <div className="form-group sidebar-item-disconnect">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
          >
            <button
              className="frame-head-button btn btn-link"
              type="button"
              aria-label="Refresh home sidebar"
              onClick={() => refreshSidebarHome()}
            >
              <i className="icon-refresh" />
            </button>
            <b>Refresh</b>
            <button
              className="frame-head-button btn btn-link"
              type="button"
              aria-label="Disconnect"
              onClick={() => confirm({
                title: 'Are you sure you want to close this window?',
                onOk() {
                  requestDisconnect();
                },
                onCancel() {
                  return false;
                },
              })}
            >
              <i className="icon-close-session" />
            </button>
            <b>Close Session</b>
          </div>
        </div>
      </div>
    </div>
  );
};

SidebarHome.propTypes = {
  edges: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    cnt: PropTypes.number,
  })).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    cnt: PropTypes.number,
  })).isRequired,
  propertyKeys: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    key_type: PropTypes.string,
  })).isRequired,
  setCommand: PropTypes.func.isRequired,
  command: PropTypes.string.isRequired,
  trimFrame: PropTypes.func.isRequired,
  addFrame: PropTypes.func.isRequired,
  getMetaData: PropTypes.func.isRequired,
};

export default SidebarHome;
