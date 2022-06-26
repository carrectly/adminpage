import React, { useState } from 'react';
import { Modal, Button, Form, Input, InputNumber, Popover, Row, Col, Checkbox } from 'antd';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addServiceThunk } from '../../store/services';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;

const AddService = () => {
  const [form] = Form.useForm();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    form.resetFields();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onFinish = (values) => {
    dispatch(addServiceThunk(values));
    handleClose();
    form.resetFields();
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
      <Popover content="Click here to add a new service">
        <PlusCircleFilled
          className="float-plus"
          onClick={() => handleShow(true)}
          icon={faPlusCircle}
        />
      </Popover>
      <Modal title="Add Service" visible={show} footer={null} closable={false} getContainer={false}>
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          size="large"
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Service Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Show on Website" noStyle name="is_show_user" valuePropName="checked">
            <Checkbox>Show on Website</Checkbox>
          </Form.Item>
          <Row gutter={16}>
            <Col span="12">
              <Form.Item
                label="Price in AdminPage"
                name="price"
                rules={[{ required: true }, { type: 'number' }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item label="Price for Website" name="price_customer">
                <TextArea rows={1} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Duration" name="duration">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={1} />
          </Form.Item>
          <Form.Item label="Short Description" name="short_description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Long Description" name="long_description">
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

export default AddService;
