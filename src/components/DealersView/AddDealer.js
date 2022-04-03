import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDealerThunk } from '../../store/dealers.js'
import { Form, Button, Input, Modal } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const AddDealer = (props) => {
  const [form] = Form.useForm()
  const [isValid, Validate] = useState(false)
  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(addDealerThunk(values))
    form.resetFields()
    props.onHide()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onCancel = () => {
    form.resetFields()
    props.onHide()
  }

  const onChange = () => {
    const { name, email } = form.getFieldValue()
    if (name && email) {
      if (name.length > 1 && email.length > 1 && email.includes('@')) {
        Validate(true)
      } else {
        Validate(false)
      }
    } else {
      Validate(false)
    }
  }

  return (
    <Modal title="New Service Shop" visible={props.show} footer={null} closable={false} getContainer={false}>
      <Form {...layout} form={form} name="control-hooks" size="large" onFinish={onFinish} onFinishFailed={onFinishFailed} onChange={onChange}>
        <Form.Item label="Shop Name">
          <Form.Item name="name" noStyle rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Email">
          <Form.Item name="email" noStyle rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Phone number">
          <Form.Item name="phoneNumber" noStyle>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Specialty">
          <Form.Item name="specialty" noStyle>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Address">
          <Form.Item name="location" noStyle>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" type="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={!isValid}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddDealer
