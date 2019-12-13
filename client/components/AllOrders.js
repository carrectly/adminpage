import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllOrdersThunk} from '../store/orders'
import {getUserOrdersThunk} from '../store/userorders'

class AllOrders extends Component {
	render() {
		const orders = this.props.orders || []
		return (
			<div>
				<div>
					<h1>Orders coming soon</h1>
					<button
						type='button'
						onClick={() => this.props.getOrders()}>
						View All Orders
					</button>
				</div>
				<table>
					<thead>
						<tr>
							<th>Person Email</th>
							<th>Phone Number</th>
							<th>Service</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Car Year</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{orders.map(ord => (
							<tr key={ord.hash}>
								<td>{ord.email}</td>
								<td>
									<Link
										to={`/singleuser/${ord.phone_number}`}
										id={ord.phone_number}>
										{ord.phone_number}
									</Link>
								</td>
								<td>{ord.service}</td>
								<td>{ord.make}</td>
								<td>{ord.model}</td>
								<td>{ord.year}</td>
								<td>{ord.date}</td>
							</tr>
						))}
					</tbody>
				</table>
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
		getOrders: () => dispatch(getAllOrdersThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllOrders)
)
