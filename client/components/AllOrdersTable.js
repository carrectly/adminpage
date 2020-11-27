import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

const AllOrdersTable = ({orders, loading}) => {
	if (loading) {
		return (
			<tbody>
				<tr>
					<td>
						<h2>Loading...</h2>
					</td>
				</tr>
			</tbody>
		)
	}

	return (
		<tbody>
			{orders.map(ord => (
				<tr key={ord.hash}>
					<td>
						<Link to={`/singleorder/${ord.hash}`} id={ord.hash}>
							Details
						</Link>
					</td>
					<td>{ord.status}</td>
					<td>{`${ord.customer.firstName} ${ord.customer.lastName}`}</td>
					<td>
						<Link
							to={`/singlecustomer/${ord.customerPhoneNumber}`}
							id={ord.customerPhoneNumber}>
							{ord.customerPhoneNumber}
						</Link>
					</td>
					<td>{ord.carMake}</td>
					<td>{ord.carModel}</td>
					<td>{ord.pickupLocation}</td>
					<td>{moment(ord.pickupDate).format('M/D/YY hh:mm A')}</td>
				</tr>
			))}
		</tbody>
	)
}

export default AllOrdersTable
