import React from 'react'

const OrdersTableHeader = () => {
	return (
		<thead>
			<tr>
				<th>Order ID</th>
				<th>Customer Phone#</th>
				<th>Customer Name</th>
				<th>Car Make</th>
				<th>Car Model</th>
				<th>Location</th>
				<th>Created At</th>
				<th>Pickup Date</th>
				<th>Dropoff Date</th>
			</tr>
		</thead>
	)
}

export default OrdersTableHeader
