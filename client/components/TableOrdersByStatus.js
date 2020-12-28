import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Table, Card, Accordion, Button} from 'react-bootstrap'
import moment from 'moment'
import OrdersTableHeader from './OrdersTableHeader'

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
								<OrdersTableHeader />
								<tbody>
									{array.map(ord => (
										<tr key={ord.hash}>
											<td>
												<Link
													to={`/singleorder/${ord.hash}`}
													id={ord.hash}>
													{ord.hash}
												</Link>
											</td>
											<td>{ord.customerPhoneNumber}</td>
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
											<td>
												{moment(ord.createdAt).format(
													'M/D/YY hh:mm A'
												)}
											</td>
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
