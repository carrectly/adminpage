import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {logout} from '../store'

class Navbar extends React.Component {
	constructor() {
		super()
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.state = {
			width: window.innerWidth,
		}
	}

	handleLogout() {
		this.props.handleClick()
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowSizeChange)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange)
	}

	handleWindowSizeChange = () => {
		this.setState({width: window.innerWidth})
	}
	render() {
		const {width} = this.state
		const isMobile = width <= 500
		return isMobile ? (
			<div className='dropdown'>
				<button className='dropbtn'>
					<div className='fa fa-bars fa-2x link' />
				</button>
				<div id='myDropdown' className='dropdown-content'>
					<Link to='/account' className='link'>
						Home
					</Link>

					<Link to='/allOrders' className='link'>
						All Orders
					</Link>
					<Link to='/cancelledOrders' className='link'>
						Cancelled Orders
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
				</div>
			</div>
		) : (
			<div className='navbar1'>
				<a
					className='link'
					href='https://www.carrectly.com/book/'
					target='_blank'>
					<OverlayTrigger
						key='bottom'
						placement='bottom'
						overlay={
							<Tooltip id='tooltip-bottom'>
								Click the logo to create a booking on client's
								behalf
							</Tooltip>
						}>
						<img
							id='logo'
							src='https://www.carrectly.com/wp-content/uploads/2016/11/logo.png'
						/>
					</OverlayTrigger>
				</a>

				<Link to='/account' className='link'>
					Home
				</Link>

				<Link to='/allOrders' className='link'>
					All Orders
				</Link>

				<Link to='/cancelledOrders' className='link'>
					Cancelled Orders
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
				{this.props.isLoggedIn ? (
					<a className='link' onClick={this.handleLogout}>
						Log out
					</a>
				) : (
					<div />
				)}
			</div>
		)
	}
}

const mapState = state => {
	return {
		isLoggedIn: !!state.user.id,
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick: () => dispatch(logout()),
	}
}
export default connect(mapState, mapDispatch)(Navbar)
