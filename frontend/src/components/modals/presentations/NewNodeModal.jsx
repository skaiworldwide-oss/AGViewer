/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, Modal, Space,
} from 'antd';
import { useTranslation } from 'react-i18next';

function genNewNodeQuery(jsonInput) {
  const nodeLabel = jsonInput['Node label'];
  const nodeProperties = jsonInput['Node properties'];

  // Start building the Cypher query
  let query = `CREATE (n:${nodeLabel}`;

  if (nodeProperties) {
    query += ' {';

    // Add properties to the query
    nodeProperties.forEach((property, index) => {
      query += `${property.Key}: '${property.Value}'`;
      if (index < nodeProperties.length - 1) {
        query += ', ';
      }
    });

    query += '}';
  }

  // Close the query
  query += ') RETURN n';

  return query;
}

function onCreate(values, setOpen, setCommand) {
  setCommand(genNewNodeQuery(values));
  setOpen(false);
}

export const NewNodeModal = ({ open, setOpen, setCommand }) => {
  const [form] = Form.useForm();
  const [formValues] = useState();
  const { t } = useTranslation('modals');
  return (
    <>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
      <Modal
        open={open}
        title={t('newNodeModal.title')}
        okText={t('newNodeModal.okText')}
        cancelText={t('newNodeModal.cancelText')}
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            name="dynamic_form_nest_item"
            form={form}
            clearOnDestroy
            onFinish={(values) => onCreate(values, setOpen, setCommand)}
            style={{
              maxWidth: 600,
            }}
            autoComplete="on"
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="Node label"
          rules={[
            {
              required: true,
              message: t('newNodeModal.validation.missingNodeLabel'),
            },
          ]}
        >
          <Input placeholder={t('newNodeModal.fields.nodeLabel')} />
        </Form.Item>

        <Form.List name="Node properties">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'Key']}
                    rules={[
                      {
                        required: true,
                        message: t('newNodeModal.validation.missingPropertyKey'),
                      },
                    ]}
                  >
                    <Input placeholder={t('newNodeModal.fields.propertyKey')} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'Value']}
                    rules={[
                      {
                        required: true,
                        message: t('newNodeModal.validation.missingPropertyValue'),
                      },
                    ]}
                  >
                    <Input placeholder={t('newNodeModal.fields.propertyValue')} />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t('newNodeModal.fields.addField')}
                </Button>
              </Form.Item>

            </>
          )}

        </Form.List>
      </Modal>
    </>
  );
};
NewNodeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setCommand: PropTypes.func.isRequired,
};

export default NewNodeModal;
