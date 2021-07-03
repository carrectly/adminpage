import React, {useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Form, Input} from 'antd'
import {GoogleOutlined, UserOutlined, LockOutlined} from '@ant-design/icons'

/**
 * COMPONENT
 */
const AuthForm = props => {
	const {name, displayName, error} = props
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const [isValid, Validate] = useState(false)

	const onFinish = values => {
		console.log('values', values.hasOwnProperty('signup'))
		const {email, password} = values
		if (values.hasOwnProperty('signup')) {
			dispatch(auth(email, password, 'signup'))
			form.resetFields()
		} else {
			dispatch(auth(email, password, 'login'))
			form.resetFields()
		}
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const onCancel = () => {
		form.resetFields()
	}

	const onChange = () => {
		const {password, email} = form.getFieldValue()

		if (password && email) {
			if (
				password.length > 6 &&
				email.length > 1 &&
				email.includes('@')
			) {
				Validate(true)
			} else {
				Validate(false)
			}
		} else {
			Validate(false)
		}
	}

	return (
		<div className='loginForm'>
			<Form
				form={form}
				name={name}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onChange={onChange}>
				<Form.Item
					name='email'
					rules={[
						{
							required: true,
							message: 'Please input your email!',
						},
					]}>
					<Input
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
						placeholder='Email'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
					]}>
					<Input
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>
				{name === 'signup' ? (
					<div>
						<Form.Item name='firstName'>
							<Input
								prefix={
									<UserOutlined className='site-form-item-icon' />
								}
								placeholder='First Name'
							/>
						</Form.Item>
						<Form.Item name='lastName'>
							<Input
								prefix={
									<UserOutlined className='site-form-item-icon' />
								}
								placeholder='Last Name'
							/>
						</Form.Item>
					</div>
				) : (
					<div />
				)}
				<Form.Item name={name}>
					<Button
						style={{width: '50%'}}
						type='primary'
						htmlType='submit'
						disabled={!isValid}>
						{displayName}
					</Button>
					<Button
						style={{width: '50%'}}
						htmlType='button'
						type='secondary'
						onClick={onCancel}>
						Reset
					</Button>
				</Form.Item>
				{error && error.response && <div> {error.response.data} </div>}
			</Form>
			<a href='/auth/google'>
				<Button type='primary' style={{width: '100%'}}>
					{displayName} with Google <GoogleOutlined />
				</Button>
			</a>
		</div>
	)
}

const mapLogin = state => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.user.error,
	}
}

const mapSignup = state => {
	return {
		name: 'signup',
		displayName: 'Register',
		error: state.user.error,
		user: state.user,
	}
}

export const Login = connect(mapLogin, null)(AuthForm)
export const Signup = connect(mapSignup, null)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	error: PropTypes.object,
}
