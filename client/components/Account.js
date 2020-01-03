import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Login} from './auth-form'
import {logout} from '../store'
import BookingsByStatus from './BookingsByStatus'

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
					<h3>
						Welcome Carrectly Admin. Login with Google to access all
						features
					</h3>
					<Login />
				</div>
			)
		}
		return (
			<React.Fragment>
				<h1 className='center'>Hello, {this.props.user.email}</h1>
				<div className='flex-display flex-wrap account'>
					<div className='center'>
						<button type='button' onClick={this.handleLogout}>
							Log Out
						</button>
					</div>
				</div>
				<div>
					<BookingsByStatus />
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
