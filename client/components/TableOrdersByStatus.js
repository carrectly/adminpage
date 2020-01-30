import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class TableOrdersByStatus extends Component {
	render() {
		const array = this.props.ordersArray || []
		return (
			<tbody>
				{array.map(ord => (
					<tr key={ord.hash}>
						<td>
							<Link to={`/singleorder/${ord.hash}`} id={ord.hash}>
								Details
							</Link>
						</td>
						<td>{ord.status}</td>
						<td>{new Date(ord.pickupDate).toUTCString()}</td>
						<td>{new Date(ord.dropoffDate).toUTCString()}</td>
						<td>
							<Link
								to={`/singlecustomer/${ord.customerPhoneNumber}`}
								id={ord.customerPhoneNumber}>
								{ord.customer.firstName} {ord.customer.lastName}
							</Link>
						</td>
						<td>{ord.carMake}</td>
						<td>{ord.carModel}</td>
						<td>{ord.pickupLocation}</td>
					</tr>
				))}
			</tbody>
		)
	}
}

export default withRouter(connect(null, null)(TableOrdersByStatus))
