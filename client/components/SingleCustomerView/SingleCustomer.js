import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCustomerOrdersThunk} from '../../store/customerorders'
import {Card} from 'antd'
import {getSingleCustomerThunk} from '../../store/singlecustomer'
import UpdateCustomer from './UpdateCustomer'
import moment from 'moment'

class SingleCustomer extends Component {
	async componentDidMount() {
		try {
			await this.props.getCustomer(this.props.match.params.userid)
			await this.props.getOrders(this.props.match.params.userid)
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const userorders = this.props.orders || []
		const customer = this.props.customer || {}
		return (
			<div>
				<div className='customercontainer'>
					<div className='customerinfo'>
						<Card
							className='clientcard'
							title={`${customer.firstName} ${customer.lastName}`}>
							<div>{customer.email}</div>
							<div>{customer.location}</div>
							<div>{customer.phoneNumber}</div>
							<div>{customer.location}</div>
							<div>
								<span>Created on </span>
								{moment(customer.createdAt).format(
									'M/D/YY hh:mm A'
								)}
							</div>
							<div>
								<span>Updated on </span>
								{moment(customer.updatedAt).format(
									'M/D/YY hh:mm A'
								)}
							</div>
						</Card>
					</div>
					<div className='customerupdate'>
						<UpdateCustomer />
					</div>
				</div>
				<h3>Order History</h3>
				<table>
					<thead>
						<tr>
							<th>Status</th>
							<th>Pickup Date</th>
							<th>Dropoff Date</th>
							<th>Pickup Location</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Car Year</th>
							<th>Order Details</th>
						</tr>
					</thead>
					<tbody>
						{userorders.map(ord => (
							<tr key={ord.hash}>
								<td>{ord.status}</td>
								<td>
									{new Date(ord.pickupDate).toUTCString()}
								</td>
								<td>
									{new Date(ord.dropoffDate).toUTCString()}
								</td>
								<td>{ord.pickupLocation}</td>
								<td>{ord.carMake}</td>
								<td>{ord.carModel}</td>
								<td>{ord.carYear}</td>
								<td>
									<Link
										to={`/singleorder/${ord.hash}`}
										id={ord.hash}>
										View
									</Link>
								</td>
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
		orders: state.customerorders,
		customer: state.singlecustomer,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrders: id => dispatch(getCustomerOrdersThunk(id)),
		getCustomer: id => dispatch(getSingleCustomerThunk(id)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCustomer)
