import React, {useState} from 'react'
import {Modal, Button, Form, Input} from 'antd'

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}

const UpdateService = props => {
	const [form] = Form.useForm()
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const onFinish = values => {
		props.updateService(props.service.id, values)
		handleClose()
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div>
			<Button type='primary' onClick={() => handleShow(true)}>
				Update
			</Button>
			<Modal
				title={`${props.service.name}`}
				visible={show}
				footer={null}
				closable={false}>
				<Form
					{...layout}
					form={form}
					name='control-hooks'
					size='large'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}>
					<Form.Item
						name='name'
						label='Service Name'
						initialValue={`${props.service.name}`}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='price'
						label='Service Price'
						initialValue={props.service.price}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='description'
						label='Description'
						initialValue={props.service.description || ''}>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button
							htmlType='button'
							type='secondary'
							onClick={handleClose}>
							Cancel
						</Button>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default UpdateService
