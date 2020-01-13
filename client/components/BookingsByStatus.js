import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOrdersStatusThunk, clearAllOrdersThunk} from '../store/orders'
import TableOrdersByStatus from './TableOrdersByStatus'
import {Table} from 'react-bootstrap'

class BookingsByStatus extends Component {
	async componentDidMount() {
		await this.props.getOrders()
	}

	componentWillUnmount() {
		this.props.clearOrders()
	}

	render() {
		const orders = this.props.orders || []
		const received = orders.filter(el => el.status === 'received')
		const wquote = orders.filter(el => el.status === 'waiting on quote')
		const aquote = orders.filter(
			el => el.status === 'quote approved - getting serviced'
		)
		const pinvoice = orders.filter(
			el => el.status === 'completed - pending invoice'
		)
		const sinvoice = orders.filter(
			el => el.status === 'completed - invoice sent'
		)

		return (
			<div>
				<Table striped bordered hover size='sm' variant='dark'>
					<thead>
						<tr>
							<th colSpan='8'>
								<h5 className='status1'>
									Newly Received - confirmation required
								</h5>
							</th>
						</tr>
						<tr>
							<th>Order ID</th>
							<th>Status</th>
							<th>Pickup Date</th>
							<th>Dropoff Date</th>
							<th>Customer Name</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Location</th>
						</tr>
					</thead>
					<TableOrdersByStatus ordersArray={received} />

					<thead>
						<tr>
							<th colSpan='8'>
								<h5 className='status2'>Waiting on Quote</h5>
							</th>
						</tr>
					</thead>
					<TableOrdersByStatus ordersArray={wquote} />

					<thead>
						<tr>
							<th colSpan='8'>
								<h5 className='status3'>
									Quote approved - getting serviced
								</h5>
							</th>
						</tr>
					</thead>
					<TableOrdersByStatus ordersArray={aquote} />

					<thead>
						<tr>
							<th colSpan='8'>
								<h5 className='status4'>
									Completed - pending invoice
								</h5>
							</th>
						</tr>
					</thead>
					<TableOrdersByStatus ordersArray={pinvoice} />
					<thead>
						<tr>
							<th colSpan='8'>
								<h5 className='status5'>
									Completed - invoice sent
								</h5>
							</th>
						</tr>
					</thead>
					<TableOrdersByStatus ordersArray={sinvoice} />
				</Table>
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
