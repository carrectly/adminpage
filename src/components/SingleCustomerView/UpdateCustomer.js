import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSingleCustomerThunk } from '../../store/singlecustomer'
import { Form, Button, Input } from 'antd'
import { useParams } from 'react-router-dom'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
}

const UpdateCustomer = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const params = useParams()
  const userid = params.userid

  const onFinish = (values) => {
    clean(values)
    dispatch(updateSingleCustomerThunk(userid, values))
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onCancel = () => {
    form.resetFields()
  }

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="First Name">
          <Form.Item noStyle name="firstName">
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Last Name">
          <Form.Item noStyle name="lastName">
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Email">
          <Form.Item noStyle name="email">
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Phone number">
          <Form.Item noStyle name="phoneNumber">
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button onClick={onCancel} type="secondary">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateCustomer
