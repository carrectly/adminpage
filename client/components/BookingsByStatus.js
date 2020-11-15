import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOrdersStatusThunk, clearAllOrdersThunk} from '../store/orders'
import TableOrdersByStatus from './TableOrdersByStatus'
import {Accordion, Card, Button} from 'react-bootstrap'

class BookingsByStatus extends Component {
	async componentDidMount() {
		try {
			await this.props.getOrders()
		} catch (err) {
			console.log(err)
		}
	}

	// componentWillUnmount() {
	// 	this.props.clearOrders()
	// }

	render() {
		const orders = this.props.orders || []
		const booked = orders.filter(el => el.status === 'booked')
		const in_process = orders.filter(el => el.status === 'in process')
		const sinvoice = orders.filter(el => el.status === 'cancelled')

		return (
			<div>
				<TableOrdersByStatus
					ordersArray={booked}
					status="booked"
					index={0}
				/>
				<TableOrdersByStatus
					ordersArray={in_process}
					status="in_process"
					index={1}
				/>
				<TableOrdersByStatus
					ordersArray={sinvoice}
					status="cancelled"
					index={2}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrders: () => dispatch(getOrdersStatusThunk()),
		clearOrders: () => dispatch(clearAllOrdersThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(BookingsByStatus)
)
