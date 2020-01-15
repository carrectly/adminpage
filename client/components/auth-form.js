import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
	Table,
	Form,
	Button,
	Row,
	Col,
	ButtonToolbar,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap'
/**
 * COMPONENT
 */
const AuthForm = props => {
	const {name, displayName, handleSubmit, handleReset, error} = props
	return (
		<div>
			<Form onSubmit={handleSubmit} onReset={handleReset} name={name}>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>
						<small>Email</small>
					</Form.Label>
					<Form.Control name='email' type='text' />
				</Form.Group>
				<br />
				<Form.Group controlId='formBasicPassword'>
					<Form.Label>
						<small>Password</small>
					</Form.Label>
					<Form.Control name='password' type='password' />
				</Form.Group>
				<br />
				<div>
					<Button type='submit' id='login'>
						Login
					</Button>
					<Button type='reset' id='signup'>
						Signup
					</Button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</Form>
			<a href='/auth/google'>
				<Button variant='success' type='reset' id='signup'>
					{displayName} with Google{' '}
					<img className='google' src='/google-icon.png' />
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
			const formName = 'login'
			const email = evt.target.email.value
			const password = evt.target.password.value
			dispatch(auth(email, password, formName))
		},
		handleReset(evt) {
			evt.preventDefault()
			const formName = 'signup'
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
