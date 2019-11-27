import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
	AllUsers,
	AllOrders,
	Chat,
	Gmail,
	Menu,
	Navbar,
	SingleOrder,
	SingleUser,
} from './components'

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={AllOrders} />
				<Route path='/orders/:orderid' component={SingleOrder} />
				<Route path='/orders' component={AllOrders} />
				<Route path='/users/:userid' component={SingleUser} />
				<Route path='/users' component={AllUsers} />
			</Switch>
		)
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)
