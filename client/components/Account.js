import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Login} from './auth-form'

import {logout} from '../store'
import axios from 'axios'

let defaultState = {
	password1: '',
	password2: '',
	email: '',
	shippingAddress: '',
	err: false,
	message: '',
}

class Account extends Component {
	constructor() {
		super()
		this.state = defaultState
		this.handleLogout = this.handleLogout.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleEmail = this.handleEmail.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.handleShipping = this.handleShipping.bind(this)
	}

	handleLogout() {
		this.props.handleClick()
	}

	async handleEmail(evt) {
		let update = {
			email: this.state.email,
		}
		evt.preventDefault()
		try {
			await axios.put(`/api/users/${this.props.user.id}`, update)
			this.props.user.email = this.state.email
			this.setState(defaultState)
		} catch (err) {
			this.setState({
				error: `There was a problem changing email!: ${err.message}`,
			})
		}
	}

	async handleShipping(evt) {
		let update = {
			shippingAddress: this.state.shippingAddress,
		}
		evt.preventDefault()
		try {
			await axios.put(`/api/users/${this.props.user.id}`, update)
			this.props.user.shippingAddress = this.state.shippingAddress
			this.setState(defaultState)
		} catch (err) {
			this.setState({
				error: `There was a problem changing shipping address!: ${err.message}`,
			})
		}
	}

	async handlePassword(evt) {
		evt.preventDefault()
		if (this.state.pasword1 !== this.state.password2) {
			this.setState({
				message: 'Passwords Do Not Match!',
				err: true,
			})
		}
		if (!this.state.password1) {
			this.setState({
				message: 'Field is Empty!',
				err: true,
			})
		} else if (this.state.password1 === this.state.password2) {
			let update = {password: this.state.password1}
			try {
				await axios.put(`/api/users/${this.props.user.id}`, update)
				this.setState(defaultState)
			} catch (err) {
				this.setState({
					error: `There was a problem changing password!: ${err.message}`,
				})
			}
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		})
	}

	render() {
		const isAdmin = this.props.user.isAdmin
		if (!this.props.user.id) {
			return (
				<div className='login'>
					<h3>Already have an account?</h3>
					<Login />
				</div>
			)
		}
		return (
			<React.Fragment>
				<h1 className='center'>Hello, {this.props.user.email}</h1>
				<div className='flex-display flex-wrap account'>
					<div>
						<form onSubmit={this.handleEmail}>
							<p>
								Update Email:
								<br />
								<input
									type='text'
									onChange={this.handleChange}
									name='email'
									value={this.state.email}
								/>
								<br />
								<button type='submit'> Submit </button>
							</p>
						</form>
					</div>

					<div>
						<p>
							Your Shipping Address:{' '}
							{this.props.user.shippingAddress}
						</p>
						<form onSubmit={this.handleShipping}>
							<p>
								Update Shipping Addresss:
								<br />
								<input
									type='text'
									onChange={this.handleChange}
									name='shippingAddress'
									value={this.state.shippingAddress}
								/>
								<br />
								<button type='submit'> Submit </button>
							</p>
						</form>
					</div>

					<div>
						<form onSubmit={this.handlePassword}>
							<p>
								{' '}
								Update Password:
								<br />
								<input
									type='password'
									name='password1'
									onChange={this.handleChange}
									value={this.state.password1}
								/>
								<br />
								<input
									type='password'
									name='password2'
									onChange={this.handleChange}
									value={this.state.password2}
								/>
								<br />
								<button type='submit'>Submit</button>
								{this.state.err && (
									<span className='warning'>
										{this.state.message}
									</span>
								)}
							</p>
						</form>
					</div>

					<div className='admin-manage vertical-center'>
						<button className=''>
							<Link to='/orders/history' className='clean-link'>
								Your Order History
							</Link>
						</button>
					</div>

					<div className='admin-manage flex-display'>
						{isAdmin ? (
							<React.Fragment>
								<button type='button'>
									<Link to='/users' className='clean-link'>
										Manage Users
									</Link>
								</button>
								<button type='button'>
									<Link to='/items' className='clean-link'>
										Manage Products
									</Link>
								</button>
								<button type='button'>
									<Link to='/orders' className='clean-link'>
										Manage Orders
									</Link>
								</button>
								<button type='button'>
									<Link
										to='/categories'
										className='clean-link'>
										Manage Categories
									</Link>
								</button>
							</React.Fragment>
						) : (
							<button className='contact-us'>Contact us</button>
						)}
					</div>

					<div>
						<button onClick={this.handleLogout}>Log Out</button>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick: () => dispatch(logout()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Account))
