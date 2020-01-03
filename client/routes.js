import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {me} from './store'
import {
	AllCustomers,
	SingleCustomer,
	AllOrders,
	SingleOrder,
	Chat,
	Gmail,
	Menu,
	Navbar,
	Account,
	Dashboard,
	UserHome,
	Login,
	Dealers,
	CalendarView,
	SingleDealer,
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
				<Route path='/allOrders' component={AllOrders} />
				<Route path='/allcustomers' component={AllCustomers} />
				<Route
					path='/singlecustomer/:userid'
					component={SingleCustomer}
				/>
				<Route path='/singleorder/:orderid' component={SingleOrder} />
				<Route path='/account' component={Account} />
				<Route path='/dealers/:dealerid' component={SingleDealer} />
				<Route path='/dealers' component={Dealers} />

				{/* <Route path='/gmail' component={Gmail} /> */}
				<Route path='/chat' component={Chat} />
				<Route path='/calendar' component={CalendarView} />
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
