import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {me} from './store'
import {
	AllCustomers,
	SingleCustomer,
	AllOrders,
	SingleOrder,
	Account,
	Login,
	Dealers,
	CalendarView,
	SingleDealer,
	AllServices,
} from './components'

class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const isLoggedIn = this.props.isLoggedIn
		console.log('WHO IS LOGGED IN', isLoggedIn)
		let show = true
		// if (isLoggedIn === 'info@carrectly.com') {
		// 	show = true
		// } else {
		// 	show = false
		// }
		return (
			<Switch>
				<Route exact path='/' component={Account} />
				<Route path='/login' component={Login} />
				<Route path='/account' component={Account} />
				{show && (
					<Switch>
						<Route path='/allOrders' component={AllOrders} />
						<Route path='/allServices' component={AllServices} />
						<Route path='/allCustomers' component={AllCustomers} />
						<Route
							path='/singlecustomer/:userid'
							component={SingleCustomer}
						/>
						<Route
							path='/singleorder/:orderid'
							component={SingleOrder}
						/>
						<Route
							path='/dealers/:dealerid'
							component={SingleDealer}
						/>
						<Route path='/dealers' component={Dealers} />
						<Route path='/calendar' component={CalendarView} />
					</Switch>
				)}
			</Switch>
		)
	}
}

const mapState = state => {
	return {
		isLoggedIn: state.user.email,
	}
}

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me())
		},
	}
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
