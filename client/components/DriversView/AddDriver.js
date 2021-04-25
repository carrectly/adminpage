import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addDriverThunk} from '../../store/drivers.js'
import {Form, Button, Input, Modal, Select} from 'antd'
import {tagColorsArray} from '../util'

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}

const colors = tagColorsArray()

const AddDriver = props => {
	const [form] = Form.useForm()
	const [isValid, Validate] = useState(false)
	const dispatch = useDispatch()

	const onFinish = values => {
		dispatch(addDriverThunk(values))
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
			title='New Driver'
			visible={props.show}
			footer={null}
			closable={false}>
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
					label='Driver name'
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
				<Form.Item name='imageUrl' label='Image URL'>
					<Input />
				</Form.Item>
				<Form.Item
					name='tagColor'
					label='Tag Color'
					rules={[{required: true}]}>
					<Select placeholder="Select a color for driver's tag in the table">
						{colors.map(color => (
							<Option value={color} key={color}>
								<div style={{backgroundColor: `${color}`}}>
									{color}
								</div>
							</Option>
						))}
					</Select>
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
		</Modal>
	)
}

export default AddDriver
