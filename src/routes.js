import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { me } from './store'
import {
  AllCustomers,
  SingleCustomer,
  AllOrders,
  SingleOrder,
  Account,
  Login,
  Dealers,
  CalendarView,
  AllServices,
  Drivers,
  Users,
  AllTripsView,
} from './components'

class AppRoutes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    let show = true
    if (this.props.userRole !== 'unconfirmed' && this.props.isLoggedIn) {
      show = true
    } else {
      show = false
    }
    return (
      <Routes>
        <Route exact path="/" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        {show && (
          <React.Fragment>
            <Route path="/allOrders" element={<AllOrders />} />
            <Route path="/allServices" element={<AllServices />} />
            <Route path="/allCustomers" element={<AllCustomers />} />
            {this.props.userRole === 'driver' && (
              <Route path="/alltrips" element={<AllTripsView />} />
            )}
            <Route
              path="/singlecustomer/:userid"
              element={<SingleCustomer />}
            />
            <Route path="/singleorder/:orderid" element={<SingleOrder />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/calendar" element={<CalendarView />} />
          </React.Fragment>
        )}
      </Routes>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: state.user.id,
    userRole: state.user.role,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

export default connect(mapState, mapDispatch)(AppRoutes)
