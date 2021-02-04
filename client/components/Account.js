import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Login} from './auth-form'
import {logout} from '../store'
import BookingsByStatus from './HomePageView/BookingsByStatus'

class Account extends Component {
	constructor() {
		super()

		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout() {
		this.props.handleClick()
	}

	render() {
		if (!this.props.user.id) {
			return (
				<div className='login'>
					<h3 className='greeting'>
						Welcome Carrectly Admin.
						<br />
						Login with Google to access all the features
					</h3>
					<Login />
				</div>
			)
		}

		let user = false

		if (this.props.user.email === 'info@carrectly.com') {
			user = true
		}
		return (
			<React.Fragment>
				<div className='hometable'>
					{user ? <BookingsByStatus /> : <div />}
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
