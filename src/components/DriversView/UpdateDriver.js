import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateDriverThunk } from '../../store/drivers.js'
import { Modal, Button, Form, Input, Select } from 'antd'
import { EditFilled } from '@ant-design/icons'
import { tagColorsArray } from '../util'
const colors = tagColorsArray()
const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const UpdateDriver = (props) => {
  const [form] = Form.useForm()
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onFinish = (values) => {
    dispatch(updateDriverThunk(props.driver.id, values))
    handleClose()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Button
        type="text"
        onClick={() => handleShow(true)}
        icon={<EditFilled style={{ color: '#7CFC00' }} />}
      ></Button>
      <Modal
        title={`${props.driver.name}`}
        visible={show}
        footer={null}
        closable={false}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Driver Name">
            <Form.Item
              name="name"
              noStyle
              initialValue={`${props.driver.name}`}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Email">
            <Form.Item
              name="email"
              noStyle
              initialValue={props.driver.email}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Phone number">
            <Form.Item
              name="phoneNumber"
              noStyle
              initialValue={props.driver.phoneNumber}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Image URL">
            <Form.Item
              name="imageUrl"
              noStyle
              initialValue={props.driver.imageUrl || ''}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Tag Color">
            <Form.Item noStyle name="tagColor">
              <Select
                placeholder="Select a color for driver's tag in the table"
                initialValue={props.driver.tagColor}
              >
                {colors.map((color) => (
                  <Option value={color} key={color}>
                    <div style={{ backgroundColor: `${color}` }}>{color}</div>
                  </Option>
                ))}
              </Select>
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
  )
}

export default UpdateDriver
