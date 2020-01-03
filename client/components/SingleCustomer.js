import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserOrdersThunk} from '../store/userorders'
import {Table} from 'react-bootstrap'
import {getSingleCustomerThunk} from '../store/singlecustomer'
import UpdateCustomer from './UpdateCustomer'

class SingleCustomer extends Component {
	componentDidMount() {
		this.props.getOrders(this.props.match.params.userid)
		this.props.getCustomer(this.props.match.params.userid)
	}

	render() {
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
							<th>Person Email</th>
							<th>Phone Number</th>
							<th>Service</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Car Year</th>
							<th>Date</th>
							<th>Order Details</th>
						</tr>
					</thead>
					<tbody>
						{userorders.map(ord => (
							<tr key={ord.hash}>
								<td>{ord.email}</td>
								<td>{ord.phone_number}</td>
								<td>{ord.service}</td>
								<td>{ord.make}</td>
								<td>{ord.model}</td>
								<td>{ord.year}</td>
								<td>{ord.date}</td>
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
