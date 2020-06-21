import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addDealerThunk} from '../store/dealers.js'
import {Modal} from 'react-bootstrap'
import {Form, Button, Input} from 'antd'

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}

const AddDealer = props => {
	const [form] = Form.useForm()
	const [isValid, Validate] = useState(false)
	const dispatch = useDispatch()

	const onFinish = values => {
		dispatch(addDealerThunk(values))
		form.resetFields()
		props.onHide()
	}
	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const onCancel = () => {
		form.resetFields()
		props.onHide()
	}

	const onChange = () => {
		const {name, email} = form.getFieldValue()
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
		<Modal
			{...props}
			aria-labelledby='example-custom-modal-styling-title'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					New Service Shop
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					{...layout}
					form={form}
					name='control-hooks'
					size='large'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					onChange={onChange}>
					<Form.Item
						name='name'
						label='Shop Name'
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='email'
						label='Email'
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item name='phoneNumber' label='Phone number'>
						<Input />
					</Form.Item>
					<Form.Item name='specialty' label='Specialty'>
						<Input />
					</Form.Item>
					<Form.Item name='location' label='Address'>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button
							htmlType='button'
							type='secondary'
							onClick={onCancel}>
							Cancel
						</Button>
						<Button
							type='primary'
							htmlType='submit'
							disabled={!isValid}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddDealer
