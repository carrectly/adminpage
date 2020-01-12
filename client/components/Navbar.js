import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Menu from './Menu'
import {Button, ButtonToolbar, OverlayTrigger, Tooltip} from 'react-bootstrap'

class Navbar extends React.Component {
	render() {
		return (
			<div className='navbar1'>
				<a
					className='link'
					href='https://www.carrectly.com/book/'
					target='_blank'>
					<ButtonToolbar>
						<OverlayTrigger
							key='bottom'
							placement='bottom'
							overlay={
								<Tooltip id='tooltip-bottom'>
									Click the logo to create a booking on
									client's behalf
								</Tooltip>
							}>
							<img src='https://www.carrectly.com/wp-content/uploads/2016/11/logo.png' />
						</OverlayTrigger>
					</ButtonToolbar>
				</a>

				<Link to='/account' className='link'>
					Home
				</Link>

				<Link to='/allOrders' className='link'>
					All Orders
				</Link>

				<Link to='/allCustomers' className='link'>
					All Customers
				</Link>

				<Link to='/dealers' className='link'>
					Service Shops
				</Link>

				<Link to='/calendar' className='link'>
					Calendar
				</Link>
				<Link to='/allServices' className='link'>
					Services
				</Link>

				<ButtonToolbar>
					<OverlayTrigger
						key='bottom'
						placement='bottom'
						overlay={
							<Tooltip id='tooltip-bottom'>
								To view Hangouts Chat press{' '}
								<strong>"CTRL + SHIFT + 5"</strong>
							</Tooltip>
						}>
						<a className='link'>Chat</a>
					</OverlayTrigger>
				</ButtonToolbar>
			</div>
		)
	}
}

const mapState = state => {
	return {
		isLoggedIn: !!state.user.id,
	}
}

export default connect(mapState, null)(Navbar)
