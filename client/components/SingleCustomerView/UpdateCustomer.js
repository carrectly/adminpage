import React from 'react'
import {useDispatch} from 'react-redux'
import {updateSingleCustomerThunk} from '../../store/singlecustomer'
import {Form, Button, Input} from 'antd'
import {useParams} from 'react-router-dom'

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
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

	const onFinish = values => {
		clean(values)
		dispatch(updateSingleCustomerThunk(userid, values))
		form.resetFields()
	}

	const onFinishFailed = errorInfo => {
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
				name='control-hooks'
				size='large'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Form.Item name='firstName' label='First Name'>
					<Input />
				</Form.Item>
				<Form.Item name='lastName' label='Last Name'>
					<Input />
				</Form.Item>
				<Form.Item name='email' label='Email'>
					<Input />
				</Form.Item>
				<Form.Item name='phoneNumber' label='Phone number'>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button onClick={onCancel} type='secondary'>
						Cancel
					</Button>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default UpdateCustomer
