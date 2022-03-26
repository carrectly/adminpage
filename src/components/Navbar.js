/* eslint-disable complexity */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Popover } from 'antd'
import { logout } from '../store'
import {
  FolderOutlined,
  TeamOutlined,
  ToolOutlined,
  CalendarOutlined,
  TableOutlined,
  FireOutlined,
  LogoutOutlined,
  CarOutlined,
} from '@ant-design/icons'
import './styles/navbar.scss'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    props.handleClick()
    navigate('/account')
  }

  return (
    <div className="navbar1">
      <Popover content="Click here to book for client">
        <a
          className="link"
          href="https://www.carrectly.com"
          rel="noreferrer"
          target="_blank"
        >
          <img id="logo" src={logo} alt="carrectly-logo" />
        </a>
      </Popover>
      <Link to="/account" className="link">
        <FireOutlined className="icon" />
        {props.userRole === 'driver' ? (
          <span>My Trips</span>
        ) : (
          <span>Active Orders</span>
        )}
      </Link>
      {props.userRole === 'driver' && (
        <Link to="/alltrips" className="link">
          <CarOutlined className="icon" />
          All Trips
        </Link>
      )}

      <Link to="/allOrders" className="link">
        <FolderOutlined className="icon" />
        Archived Orders
      </Link>
      <Link to="/allCustomers" className="link">
        <TeamOutlined className="icon" />
        All Customers
      </Link>
      {props.userRole !== 'driver' && (
        <Link to="/dealers" className="link">
          <ToolOutlined className="icon" />
          Service Shops
        </Link>
      )}
      {props.userRole !== 'driver' && (
        <Link to="/drivers" className="link">
          <CarOutlined className="icon" />
          Drivers
        </Link>
      )}
      {props.userRole !== 'driver' && (
        <Link to="/calendar" className="link">
          <CalendarOutlined className="icon" />
          Calendar
        </Link>
      )}
      {props.userRole !== 'driver' && (
        <Link to="/users" className="link">
          <CalendarOutlined className="icon" />
          Users
        </Link>
      )}
      {props.userRole !== 'driver' && (
        <Link to="/allServices" className="link">
          <TableOutlined className="icon" />
          Services
        </Link>
      )}

      {props.isLoggedIn ? (
        <a className="link" onClick={handleLogout}>
          <LogoutOutlined className="icon" />
          Log out
        </a>
      ) : (
        <div />
      )}
    </div>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userRole: state.user.role,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => dispatch(logout()),
  }
}
export default connect(mapState, mapDispatch)(Navbar)

// isMobile ? (
// 			<div className='dropdown'>
// 				<button className='dropbtn'>
// 					<div className='fa fa-bars fa-2x link' />
// 				</button>
// 				<div id='myDropdown' className='dropdown-content'>
// 					<Link to='/account' className='link'>
// 						Home
// 					</Link>

// 					<Link to='/allOrders' className='link'>
// 						<FolderOutlined />
// 						<span>Archived Orders</span>
// 					</Link>
// 					<Link to='/allCustomers' className='link'>
// 						<TeamOutlined />
// 						All Customers
// 					</Link>
// 					<Link to='/dealers' className='link'>
// 						<ToolOutlined />
// 						Service Shops
// 					</Link>

// 					<Link to='/calendar' className='link'>
// 						<CalendarOutlined />
// 						Calendar
// 					</Link>
// 					<Link to='/allServices' className='link'>
// 						<TableOutlined />
// 						Services
// 					</Link>
// 				</div>
// 			</div>
// 		)
