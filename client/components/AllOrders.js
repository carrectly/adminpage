import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllOrdersThunk, fetchCustomDataThunk} from '../store/orders'
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
					<h1>Orders View</h1>
					<form onSubmit={this.handleSubmit}>
						<span>
							<span> Date: </span>
							<input
								type='date'
								name='dateStart'
								min='2017-03-01'
								onChange={this.handleChange}
								value={this.state.dateStart}
							/>
							{/* <span>End Date: </span> */}
							{/* <input
								type='date'
								name='dateEnd'
								max={today}
								value={this.state.dateEnd}
							/> */}
							<button type='submit'> View Orders by Date </button>
							<button
								type='button'
								onClick={() => this.props.getOrders()}>
								View All Orders
							</button>
						</span>
					</form>
				</div>
				<Table striped bordered hover size='sm' variant='dark'>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Name</th>
							<th>Phone Number</th>
							<th>Car Make</th>
							<th>Car Model</th>
							<th>Location</th>
							<th>Date</th>
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
								<td>{`${ord.first_name} ${ord.last_name}`}</td>
								<td>
									<Link
										to={`/singleuser/${ord.phone_number}`}
										id={ord.phone_number}>
										{ord.phone_number}
									</Link>
								</td>
								<td>{ord.make}</td>
								<td>{ord.model}</td>
								<td>{ord.location}</td>
								<td>{ord.date}</td>
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
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllOrders)
)
