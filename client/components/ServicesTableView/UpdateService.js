import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Modal, Button, Form, Input, InputNumber} from 'antd'
import {updateServiceThunk} from '../../store/services'

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}

const UpdateService = ({value, row}) => {
	const [form] = Form.useForm()
	const [show, setShow] = useState(false)
	const dispatch = useDispatch()

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const onFinish = values => {
		dispatch(updateServiceThunk(row.id, values))
		handleClose()
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const validateMessages = {
		required: '${label} is required!',
		types: {
			number: '${label} is not a valid number!',
		},
	}

	return (
		<div>
			<Button type='primary' onClick={() => handleShow(true)}>
				Update
			</Button>
			<Modal
				title={`${row.name}`}
				visible={show}
				footer={null}
				closable={false}>
				<Form
					{...layout}
					form={form}
					name='control-hooks'
					size='large'
					onFinish={onFinish}
					validateMessages={validateMessages}
					onFinishFailed={onFinishFailed}>
					<Form.Item
						name='name'
						label='Service Name'
						initialValue={`${row.name}`}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='price'
						label='Service Price'
						initialValue={row.price}
						rules={[{required: true}, {type: 'number'}]}>
						<InputNumber />
					</Form.Item>
					<Form.Item
						name='description'
						label='Description'
						initialValue={row.description || ''}>
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
