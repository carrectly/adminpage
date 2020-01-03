import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
	getAllOrdersThunk,
	fetchCustomDataThunk,
	getOrdersStatusThunk,
} from '../store/orders'
import {Table, Accordion, Card, Button} from 'react-bootstrap'

// values: [
// 	'received',
// 	'waiting on quote',
// 	'quote approved - getting serviced',
// 	'completed - pending invoice',
// 	'completed - invoice sent',
// 	'completed - paid',
// ],
class BookingsByStatus extends Component {
	async componentDidMount() {
		await this.props.getOrders()
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
							<th>Order ID</th>
							<th>Status</th>
							<th>Pickup Date</th>
							<th>Dropoff Date</th>
							<th>Customer Phone Number</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Location</th>
						</tr>
					</thead>
					<tbody>
						{received.map(ord => (
							<tr key={ord.hash}>
								<td>
									<Link
										to={`/singleorder/${ord.hash}`}
										id={ord.hash}>
										Details
									</Link>
								</td>
								<td>{ord.status}</td>
								<td>{ord.pickupDate}</td>
								<td>{ord.dropoffDate}</td>
								<td>
									<Link
										to={`/singleuser/${ord.customerPhoneNumber}`}
										id={ord.customerPhoneNumber}>
										{ord.customerPhoneNumber}
									</Link>
								</td>
								<td>{ord.carMake}</td>
								<td>{ord.carModel}</td>
								<td>{ord.pickupLocation}</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Table striped bordered hover size='sm' variant='dark'>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Status</th>
							<th>Pickup Date</th>
							<th>Dropoff Date</th>
							<th>Customer Phone Number</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Location</th>
						</tr>
					</thead>
					<tbody>
						{wquote.map(ord => (
							<tr key={ord.hash}>
								<td>
									<Link
										to={`/singleorder/${ord.hash}`}
										id={ord.hash}>
										Details
									</Link>
								</td>
								<td>{ord.status}</td>
								<td>{ord.pickupDate}</td>
								<td>{ord.dropoffDate}</td>
								<td>
									<Link
										to={`/singleuser/${ord.customerPhoneNumber}`}
										id={ord.customerPhoneNumber}>
										{ord.customerPhoneNumber}
									</Link>
								</td>
								<td>{ord.carMake}</td>
								<td>{ord.carModel}</td>
								<td>{ord.pickupLocation}</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Table striped bordered hover size='sm' variant='dark'>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Status</th>
							<th>Pickup Date</th>
							<th>Dropoff Date</th>
							<th>Customer Phone Number</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Location</th>
						</tr>
					</thead>
					<tbody>
						{aquote.map(ord => (
							<tr key={ord.hash}>
								<td>
									<Link
										to={`/singleorder/${ord.hash}`}
										id={ord.hash}>
										Details
									</Link>
								</td>
								<td>{ord.status}</td>
								<td>{ord.pickupDate}</td>
								<td>{ord.dropoffDate}</td>
								<td>
									<Link
										to={`/singleuser/${ord.customerPhoneNumber}`}
										id={ord.customerPhoneNumber}>
										{ord.customerPhoneNumber}
									</Link>
								</td>
								<td>{ord.carMake}</td>
								<td>{ord.carModel}</td>
								<td>{ord.pickupLocation}</td>
							</tr>
						))}
					</tbody>
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
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(BookingsByStatus)
)
