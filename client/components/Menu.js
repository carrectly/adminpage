import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Menu extends Component {
	render() {
		return (
			<ul>
				<Link to='item1'>
					<li>Item 1</li>
				</Link>
				<Link to='item2'>
					<li>Item 2</li>
				</Link>
				<Link to='item3'>
					<li>Item 3</li>
				</Link>
			</ul>
		)
	}
}

export default withRouter(connect(null, null)(Menu))
