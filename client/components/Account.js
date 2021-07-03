import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Login, Signup} from './auth-form'
import {logout} from '../store'
import BookingsByStatus from './HomePageView/BookingsByStatus'
import {Tabs} from 'antd'
const {TabPane} = Tabs
import {UnlockFilled, EditFilled} from '@ant-design/icons'

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
					<Tabs
						type='card'
						defaultActiveKey='1'
						style={{margin: '0px 0px 10px 0px'}}
						centered={true}>
						<TabPane
							key='1'
							tab={
								<span>
									<UnlockFilled />
									Login
								</span>
							}>
							<Login />
						</TabPane>
						<TabPane
							key='2'
							tab={
								<span>
									<EditFilled />
									Register
								</span>
							}>
							<Signup />
						</TabPane>
					</Tabs>
				</div>
			)
		}

		return (
			<React.Fragment>
				<div className='hometable'>
					{this.props.user.email === 'info@carrectly.com' ? (
						<BookingsByStatus />
					) : (
						<div />
					)}
				</div>
				<div className='hometable'>
					{this.props.user.role === 'unconfirmed' ? (
						<div>
							Welcome. Your account needs to be appoved by the
							admin!
						</div>
					) : (
						<div />
					)}
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
