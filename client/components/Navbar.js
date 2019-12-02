import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Menu from './Menu'

class Navbar extends React.Component {
	render() {
		return (
			<div className='nav'>
				<div className='dropdown'>
					<button className='dropbtn'>
						<div className='fa fa-bars fa-2x link' />
					</button>
					<div id='myDropdown' className='dropdown-content'>
						<Menu />
					</div>
				</div>

				<Link to='/allOrders' className='link'>
					All Orders
				</Link>

				<Link to='/account' className='link'>
					Account
				</Link>

				<Link to='/allUsers' className='link'>
					AllUsers
				</Link>
			</div>
		)
	}
}

export default connect(null, null)(Navbar)
