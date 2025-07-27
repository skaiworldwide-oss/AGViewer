/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, Modal, Space,
} from 'antd';
import { useTranslation } from 'react-i18next';

function createCypherQuery(jsonInput) {
  const edgeLabel = jsonInput['Edge label'];
  const originID = jsonInput.OriginID;
  const targetID = jsonInput.TargetID;
  const edgeProperties = jsonInput['Edge properties'];
  let propString = '';
  if (edgeProperties && edgeProperties.length > 0) {
    const propsArray = edgeProperties.map((prop) => `${prop.Key}: '${prop.Value}'`);
    propString = `{ ${propsArray.join(', ')} }`;
  }
  const cypherQuery = `MATCH (a), (b)
  WHERE id(a) = ${originID}
  AND
  id(b) = ${targetID}
  CREATE (a)-[r:${edgeLabel} ${propString}]->(b)
  RETURN a, r, b`;
  return cypherQuery;
}

function onCreate(values, setOpen, setCommand) {
  setCommand(createCypherQuery(values));
  setOpen(false);
}

export const NewEdgeModal = (
  {
    open, setOpen, setCommand,
  },
) => {
  const [form] = Form.useForm();
  const [formValues] = useState();
  const { t } = useTranslation('modals');

  return (
    <>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
      <Modal
        open={open}
        title={t('newEdgeModal.title')}
        okText={t('newEdgeModal.okText')}
        cancelText={t('newEdgeModal.cancelText')}
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
        }}
        onCancel={() => setOpen(false)}
        modalRender={(dom) => (
          <Form
            name="dynamic_form_nest_item"
            form={form}
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
          name="Edge label"
          rules={[
            {
              required: true,
              message: t('newEdgeModal.validation.missingEdgeLabel'),
            },
          ]}
        >
          <Input plplaceholder={t('newEdgeModal.fields.edgeLabel')} />
        </Form.Item>

        <Space>
          <Form.Item
            name="OriginID"
            rules={[
              {
                required: true,
                message: t('newEdgeModal.validation.missingOriginId'),
              },
            ]}
          >
            <Input placeholder={t('newEdgeModal.fields.originId')} />
          </Form.Item>

          <Form.Item
            name="TargetID"
            rules={[
              {
                required: true,
                message: t('newEdgeModal.validation.missingTargetId'),
              },
            ]}
          >
            <Input placeholder={t('newEdgeModal.fields.targetId')} />
          </Form.Item>
        </Space>

        <Form.List name="Edge properties">
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
                        message: t('newEdgeModal.validation.missingPropertyKey'),
                      },
                    ]}
                  >
                    <Input placeholder={t('newEdgeModal.fields.propertyKey')} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'Value']}
                    rules={[
                      {
                        required: true,
                        message: t('newEdgeModal.validation.missingPropertyValue'),
                      },
                    ]}
                  >
                    <Input placeholder={t('newEdgeModal.fields.propertyValue')} />
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
                  {t('newEdgeModal.fields.addField')}
                </Button>
              </Form.Item>

            </>
          )}

        </Form.List>
      </Modal>
    </>
  );
};
NewEdgeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setCommand: PropTypes.func.isRequired,
};

export default NewEdgeModal;
