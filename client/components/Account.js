import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Login} from './auth-form'
import {logout} from '../store'
import BookingsByStatus from './BookingsByStatus'
import {Button} from 'react-bootstrap'

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
						the features
					</h3>
					<Login />
				</div>
			)
		}
		return (
			<React.Fragment>
				<div className='account'>
					<h1>Hello, {this.props.user.email}</h1>
					<Button
						variant='secondary'
						size='sm'
						onClick={this.handleLogout}>
						Log Out
					</Button>
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
