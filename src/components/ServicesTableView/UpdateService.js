import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form, Input, InputNumber, Row, Col, Checkbox } from 'antd';
import { updateServiceThunk } from '../../store/services';

const { TextArea } = Input;

const UpdateService = ({ value, row }) => {
  const [form] = Form.useForm();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFinish = (values) => {
    dispatch(updateServiceThunk(row.id, values));
    handleClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
  };

  return (
    <div>
      <Button type="primary" onClick={() => handleShow(true)}>
        Update
      </Button>
      <Modal title={`${row.name}`} visible={show} footer={null} closable={false}>
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          size="large"
          onFinish={onFinish}
          validateMessages={validateMessages}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            label="Service Name"
            initialValue={`${row.name}`}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Show on Website"
            noStyle
            name="is_show_user"
            valuePropName="checked"
            initialValue={row.is_show_user}
          >
            <Checkbox>Show on Website</Checkbox>
          </Form.Item>
          <Row gutter={16}>
            <Col span="12">
              <Form.Item
                label="Price in AdminPage"
                name="price"
                initialValue={+row.price}
                rules={[{ required: true }, { type: 'number' }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                label="Price for Website"
                name="price_customer"
                initialValue={row.price_customer}
              >
                <TextArea rows={1} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Duration" name="duration" initialValue={row.duration || ''}>
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description" initialValue={row.description || ''}>
            <TextArea rows={1} />
          </Form.Item>
          <Form.Item
            label="Short Description"
            name="short_description"
            initialValue={row.short_description || ''}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Long Description"
            name="long_description"
            initialValue={row.long_description || ''}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item style={{ marginTop: '20px' }}>
            <Button
              htmlType="button"
              type="secondary"
              onClick={handleClose}
              style={{ marginRight: '20px' }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateService;
