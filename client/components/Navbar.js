import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Menu from './Menu'

class Navbar extends React.Component {
	render() {
		return (
			<div className='nav'>
				<div className='dropdown'>
					<button type='button' className='dropbtn'>
						Chat
					</button>
					<div id='myDropdown' className='dropdown-content'>
						<Menu />
					</div>
				</div>

				<Link to='/dashboard' className='link'>
					Dashboard
				</Link>

				<Link to='/allOrders' className='link'>
					All Orders
				</Link>

				<Link to='/account' className='link'>
					Account
				</Link>

				<Link to='/allcustomers' className='link'>
					All Customers
				</Link>

				<Link to='/dealers' className='link'>
					Service Shops
				</Link>

				<Link to='/calendar' className='link'>
					Calendar
				</Link>

				{/* <Link to='/chat' className='link'>
					Chat
				</Link> */}
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
