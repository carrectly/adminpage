import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
	const {name, displayName, handleSubmit, handleReset, error} = props
	return (
		<div>
			<form onSubmit={handleSubmit} onReset={handleReset} name={name}>
				<div>
					<label htmlFor='email'>
						<small>Email</small>
					</label>
					<input name='email' type='text' />
				</div>
				<br />
				<div>
					<label htmlFor='password'>
						<small>Password</small>
					</label>
					<input name='password' type='password' />
				</div>
				<br />
				<div>
					<button type='submit' id='login'>
						Login
					</button>
					<button type='reset' id='signup'>
						Signup
					</button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
			<a href='/auth/google'>
				{displayName} with Google
				<br />
				<img className='google' src='/google-icon.png' />
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
