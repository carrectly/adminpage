import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
	getAllOrdersThunk,
	fetchCustomDataThunk,
	clearAllOrdersThunk,
} from '../store/orders'
import {Table} from 'react-bootstrap'

class AllOrders extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			dateStart: '',
			dateEnd: '',
		}
	}

	handleChange(evt) {
		console.log('event value', evt.target.value)
		this.setState({
			[evt.target.name]: evt.target.value,
		})
	}

	componentWillUnmount() {
		this.props.clearOrders()
	}

	async handleSubmit(evt) {
		evt.preventDefault()
		let obj = {}
		if (this.state.dateStart) {
			obj.dateStart = this.state.dateStart
		}
		if (this.state.dateEnd) {
			obj.dateEnd = this.state.dateEnd
		}

		try {
			await this.props.fetchCustom(obj)
		} catch (err) {
			console.log(err)
		}

		obj = {}
	}

	render() {
		let today = new Date()
		let dd = today.getDate()
		let mm = today.getMonth() + 1
		let yyyy = today.getFullYear()
		if (dd < 10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm
		}
		today = yyyy + '-' + mm + '-' + dd
		const orders = this.props.orders || []
		return (
			<div>
				<div>
					<h1 className='center'>Orders View</h1>
					<form onSubmit={this.handleSubmit}>
						<span>
							<input
								type='date'
								name='dateStart'
								placeholder='start date'
								onChange={this.handleChange}
								value={this.state.dateStart}
							/>
							<input
								type='date'
								name='dateEnd'
								placeholder='end date'
								onChange={this.handleChange}
								value={this.state.dateStart}
							/>
							<button type='submit'>
								{' '}
								Search Orders by Date{' '}
							</button>
						</span>
						<span>
							<input
								type='text'
								name='dateEnd'
								placeholder='end date'
								onChange={this.handleChange}
								value={this.state.dateStart}
							/>
							<button type='submit'>
								Search Orders by Customer Phone Number
							</button>
						</span>
						<button
							type='button'
							onClick={() => this.props.getOrders()}>
							View All Orders
						</button>
					</form>
				</div>
				<Table striped bordered hover size='sm' variant='dark'>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Status</th>
							<th>Customer Name</th>
							<th>Phone Number</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Location</th>
							<th>Pickup Date</th>
						</tr>
					</thead>
					<tbody>
						{orders.map(ord => (
							<tr key={ord.hash}>
								<td>
									<Link
										to={`/singleorder/${ord.hash}`}
										id={ord.hash}>
										Details
									</Link>
								</td>
								<td>{ord.status}</td>
								<td>{`${ord.customer.firstName} ${ord.customer.lastName}`}</td>
								<td>
									<Link
										to={`/singleuser/${ord.customerPhoneNumber}`}
										id={ord.customerPhoneNumber}>
										{ord.customerPhoneNumber}
									</Link>
								</td>
								<td>{ord.carMake}</td>
								<td>{ord.carModel}</td>
								<td>{ord.pickupLocation}</td>
								<td>{ord.pickupDate}</td>
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
		orders: state.orders,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrders: () => dispatch(getAllOrdersThunk()),
		fetchCustom: obj => dispatch(fetchCustomDataThunk(obj)),
		clearOrders: () => dispatch(clearAllOrdersThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllOrders)
)
