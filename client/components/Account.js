import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Login} from './auth-form'

import {logout} from '../store'

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
					<h3>Already have an account?</h3>
					<Login />
				</div>
			)
		}
		return (
			<React.Fragment>
				<h1 className='center'>Hello, {this.props.user.email}</h1>
				<div className='flex-display flex-wrap account'>
					<div>More user details coming soon...</div>
					<div>
						<button type='button' onClick={this.handleLogout}>
							Log Out
						</button>
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
