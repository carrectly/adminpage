import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDealerThunk } from '../../store/dealers.js';
import { Modal, Button, Form, Input } from 'antd';
import { EditFilled } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const UpdateDealer = ({ dealer }) => {
  const [form] = Form.useForm();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFinish = (values) => {
    dispatch(updateDealerThunk(dealer.id, values));
    handleClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Button
        type="text"
        onClick={() => handleShow(true)}
        icon={<EditFilled style={{ color: '#7CFC00' }} />}
      ></Button>
      <Modal title={`${dealer.name}`} visible={show} footer={null} closable={false}>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Dealer Name">
            <Form.Item
              name="name"
              noStyle
              initialValue={`${dealer.name}`}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Email">
            <Form.Item
              name="email"
              noStyle
              initialValue={dealer.email}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Phone number">
            <Form.Item name="phoneNumber" noStyle initialValue={dealer.phoneNumber}>
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Specialty">
            <Form.Item name="specialty" noStyle initialValue={dealer.specialty || ''}>
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Address">
            <Form.Item name="location" noStyle initialValue={dealer.location || ''}>
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Image URL">
            <Form.Item name="imageUrl" noStyle initialValue={dealer.imageUrl || ''}>
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button htmlType="button" type="secondary" onClick={handleClose}>
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

export default UpdateDealer;
