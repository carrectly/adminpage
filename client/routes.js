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
	Account,
	Dashboard,
} from './components'

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={Dashboard} />
				<Route path='/orders' component={AllOrders} />
				<Route path='/users' component={AllUsers} />
				<Route path='/account' component={Account} />
			</Switch>
		)
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, null)(Routes))
