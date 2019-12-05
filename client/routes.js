import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {me} from './store'
import {
	AllUsers,
	AllOrders,
	Chat,
	Gmail,
	Menu,
	Navbar,
	Account,
	Dashboard,
	UserHome,
	Login,
	Calendar,
} from './components'

class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		return (
			<Switch>
				<Route exact path='/' component={Account} />
				<Route path='/login' component={Login} />
				<Route path='/dashboard' component={Dashboard} />
				<Route path='/home' component={UserHome} />
				<Route path='/orders' component={AllOrders} />
				<Route path='/allusers' component={AllUsers} />
				<Route path='/account' component={Account} />
				<Route path='/gmail' component={Gmail} />
				<Route path='/calendar' component={Calendar} />
			</Switch>
		)
	}
}

const mapState = state => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		isLoggedIn: !!state.user.id,
	}
}

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me())
		},
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
