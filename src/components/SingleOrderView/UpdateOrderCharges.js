import React, { useState } from 'react'
import { Modal, Button, Form, InputNumber } from 'antd'
import { updateOrderDetailsThunk } from '../../store/singleorder'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { EditFilled } from '@ant-design/icons'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const UpdateOrderCharges = (props) => {
  const [form] = Form.useForm()
  const [show, setShow] = useState(false)
  const params = useParams()
  const id = params.orderid
  const serviceId = props.row.id
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()

  const onFinish = (values) => {
    const obj = { [serviceId]: values }
    dispatch(updateOrderDetailsThunk(id, obj))
    handleClose()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Button type="text" onClick={() => handleShow(true)}>
        <EditFilled style={{ color: '#7CFC00' }} />
      </Button>
      <Modal
        title={`${props.row.name}`}
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
          <Form.Item label="Customer Price">
            <Form.Item
              name="customerPrice"
              noStyle
              initialValue={props.row.orderdetails.customerPrice}
              rules={[{ required: true }]}
            >
              <InputNumber step={0.01} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Dealer Price">
            <Form.Item
              name="dealerPrice"
              noStyle
              initialValue={props.row.orderdetails.dealerPrice}
            >
              <InputNumber step={0.01} />
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

export default UpdateOrderCharges
