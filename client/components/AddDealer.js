import React, {Component} from 'react'
import {useDispatch} from 'react-redux'
import {addDealerThunk} from '../store/dealers.js'
import {Modal} from 'react-bootstrap'
import {Form, Button, Input} from 'antd'

const AddDealer = props => {
	const [form] = Form.useForm()
	const dispatch = useDispatch()

	const onFinish = values => {
		console.log(props)
		console.log('values inside modal', values)
		dispatch(addDealerThunk(values))
		form.resetFields()
		props.onHide()
	}

	const onCancel = () => {
		form.resetFields()
		props.onHide()
	}

	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					New Service Shop
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form form={form} name='control-hooks' onFinish={onFinish}>
					<Form.Item
						name='name'
						label='Service Shop Name'
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
					<Form.Item name='location' label='Business location'>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button
							htmlType='button'
							type='secondary'
							onClick={onCancel}>
							Cancel
						</Button>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddDealer
