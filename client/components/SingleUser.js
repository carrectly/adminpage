import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserOrdersThunk} from '../store/userorders'

class SingleUser extends Component {
	componentDidMount() {
		this.props.getOrders(this.props.match.params.userid)
	}

	render() {
		const userorders = this.props.orders || []
		return (
			<div>
				<h3>User Info</h3>
				<h5>...Coming soon</h5>

				<h3>Order History</h3>
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
				</table>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.userorders,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrders: id => dispatch(getUserOrdersThunk(id)),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleUser)
)
