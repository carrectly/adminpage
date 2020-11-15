import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Table, Card, Accordion, Button} from 'react-bootstrap'
import moment from 'moment'

//					let tempDate = moment(value).format('M/D/YY hh:mm A')
class TableOrdersByStatus extends Component {
	render() {
		const array = this.props.ordersArray || []
		const index = this.props.index || 0
		return (
			<Accordion defaultActiveKey='0'>
				<Card>
					<Card.Header>
						<Accordion.Toggle
							as={Card.Header}
							eventKey={index}
							className={`status${index}`}>
							{`${this.props.status.toUpperCase()} ${
								array.length
							}`}
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={index}>
						<Card.Body>
							<Table
								striped
								bordered
								hover
								size='sm'
								variant='dark'>
								<thead>
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
								<tbody>
									{array.map(ord => (
										<tr key={ord.hash}>
											<td>
												<Link
													to={`/singleorder/${ord.hash}`}
													id={ord.hash}>
													Details
												</Link>
											</td>
											<td>{ord.status}</td>
											<td>
												{moment(ord.pickupDate).format(
													'M/D/YY hh:mm A'
												)}
											</td>
											<td>
												{moment(ord.dropoffDate).format(
													'M/D/YY hh:mm A'
												)}
											</td>
											<td>
												<Link
													to={`/singlecustomer/${ord.customerPhoneNumber}`}
													id={
														ord.customerPhoneNumber
													}>
													{ord.customer.firstName}{' '}
													{ord.customer.lastName}
												</Link>
											</td>
											<td>{ord.carMake}</td>
											<td>{ord.carModel}</td>
											<td>{ord.pickupLocation}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		)
	}
}

export default withRouter(connect(null, null)(TableOrdersByStatus))
