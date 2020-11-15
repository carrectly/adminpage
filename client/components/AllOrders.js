import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllOrdersThunk, fetchCustomDataThunk} from '../store/archivedOrders'
import {
	Table,
	Form,
	Button,
	Row,
	Col,
	ButtonToolbar,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap'
import moment from 'moment'

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
		this.setState({
			[evt.target.name]: evt.target.value,
		})
	}

	componentDidMount() {
		console.log('component did mount')
		this.props.getOrders()
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
		const orders = this.props.orders || []
		return (
			<div>
				<div>
					<h1 className='center'>Orders View</h1>

					<Form className='orderfilter' onSubmit={this.handleSubmit}>
						<Row>
							<Col>
								<Form.Group controlId='formBasicStarDate'>
									<Form.Label>Start date </Form.Label>
									<Form.Control
										type='date'
										name='dateStart'
										onChange={this.handleChange}
										value={this.state.dateStart}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId='formBasicEndDate'>
									<Form.Label>End date </Form.Label>
									<Form.Control
										type='date'
										name='dateEnd'
										onChange={this.handleChange}
										value={this.state.dateEnd}
									/>
								</Form.Group>
							</Col>
							<Col>
								<OverlayTrigger
									key='top'
									placement='top'
									overlay={
										<Tooltip id='tooltip-top'>
											Must select start and end date
										</Tooltip>
									}>
									<Button
										type='submit'
										variant='primary'
										disabled={
											!this.state.dateStart ||
											!this.state.dateEnd
										}>
										{' '}
										Search Orders by Date{' '}
									</Button>
								</OverlayTrigger>
							</Col>
						</Row>
					</Form>
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
										to={`/singlecustomer/${ord.customerPhoneNumber}`}
										id={ord.customerPhoneNumber}>
										{ord.customerPhoneNumber}
									</Link>
								</td>
								<td>{ord.carMake}</td>
								<td>{ord.carModel}</td>
								<td>{ord.pickupLocation}</td>
								<td>
									{moment(ord.pickupDate).format(
										'M/D/YY hh:mm A'
									)}
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
		orders: state.archivedOrders,
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
