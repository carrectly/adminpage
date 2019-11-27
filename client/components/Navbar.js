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

				<div>
					<Link to='/AllOrders' className='link'>
						All Orders
					</Link>
				</div>

				{/* <div className="link search-container">
          <input
            className="search search-element"
            name="searchValue"
            type="text"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
          <button
            className="search-button search-element"
            onClick={this.handleSubmit}
          >
            <Link to="/items" className="link fa">
              <i className="fa fa-search fa-3x" />
            </Link>
          </button>
        </div> */}

				<Link to='/AllUsers' className='link'>
					AllUsers
				</Link>
			</div>
		)
	}
}

export default Navbar
