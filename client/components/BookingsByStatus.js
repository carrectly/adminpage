import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getActiveOrdersThunk} from '../store/activeOrders'
import TableOrdersByStatus from './TableOrdersByStatus'
import {getActiveStatusArray} from './util'

class BookingsByStatus extends Component {
	async componentDidMount() {
		try {
			await this.props.getActiveOrders()
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const statusArray = getActiveStatusArray()
		const orders = this.props.orders || []
		const nestedArr = statusArray.map(status => {
			return {
				status: status,
				orders: orders.filter(el => el.status === status),
			}
		})

		return (
			<div>
				{nestedArr.map((arr, index) => (
					<TableOrdersByStatus
						ordersArray={arr.orders}
						status={arr.status}
						key={index}
						index={index}
					/>
				))}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.activeOrders,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getActiveOrders: () => dispatch(getActiveOrdersThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(BookingsByStatus)
)
