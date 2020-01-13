import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserOrdersThunk} from '../store/userorders'
import {Table} from 'react-bootstrap'
import {getSingleCustomerThunk} from '../store/singlecustomer'
import UpdateCustomer from './UpdateCustomer'

class SingleCustomer extends Component {
	async componentDidMount() {
		await this.props.getCustomer(this.props.match.params.userid)
		await this.props.getOrders(this.props.match.params.userid)
	}

	render() {
		console.log('Phone', this.props.match.params.userid)
		const userorders = this.props.orders || []
		const customer = this.props.customer || {}
		let custArr = Object.keys(customer) || []
		return (
			<div>
				<div className='customercontainer'>
					<div className='customerinfo'>
						<h3>Customer Info</h3>
						{custArr.map(key => (
							<div key={key}>
								<span>
									{key} {customer[key]}
								</span>
							</div>
						))}
					</div>
					<div className='customerupdate'>
						<UpdateCustomer
							phone={this.props.match.params.userid}
						/>
					</div>
				</div>
				<h3>Order History</h3>
				<Table striped bordered hover size='sm' variant='dark'>
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
								<td>{ord.pickupDate}</td>
								<td>{ord.dropoffDate}</td>
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
				</Table>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.userorders,
		customer: state.singlecustomer,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrders: id => dispatch(getUserOrdersThunk(id)),
		getCustomer: id => dispatch(getSingleCustomerThunk(id)),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleCustomer)
)
