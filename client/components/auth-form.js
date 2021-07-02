import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Form, Input} from 'antd'
import {GoogleOutlined} from '@ant-design/icons'

/**
 * COMPONENT
 */
const AuthForm = props => {
	const {name, displayName, handleSubmit, error} = props
	const [form] = Form.useForm()
	const [isValid, Validate] = useState(false)

	const onFinish = values => {
		dispatch(addDealerThunk(values))
		form.resetFields()
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
				onSubmit={handleSubmit}
				name={name}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onChange={onChange}>
				<Form.Item
					name='email'
					label='Email'
					rules={[{required: true}]}>
					<Input />
				</Form.Item>
				<Form.Item
					name='password'
					label='Password'
					rules={[{required: true}]}>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						disabled={!isValid}>
						{displayName}
					</Button>
					<Button
						htmlType='button'
						type='secondary'
						onClick={onCancel}>
						Reset
					</Button>
				</Form.Item>
				{error && error.response && <div> {error.response.data} </div>}
			</Form>
			<a href='/auth/google'>
				<Button type='primary' id='signup'>
					{displayName} with Google <GoogleOutlined />
				</Button>
			</a>
		</div>
	)
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
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
		displayName: 'Sign Up',
		error: state.user.error,
		user: state.user,
	}
}

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault()
			const formName = evt.target.name
			const email = evt.target.email.value
			const password = evt.target.password.value
			dispatch(auth(email, password, formName))
		},
	}
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	error: PropTypes.object,
}
