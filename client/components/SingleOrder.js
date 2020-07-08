import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
	getSingleOrderThunk,
	updateOrderDetailsThunk,
	removeOrderServiceThunk,
} from '../store/singleorder'
import Gmail from './Gmail'
import Invoice from './Invoice'
import {Table, Button} from 'react-bootstrap'
import UpdateOrder from './UpdateOrder'
import {getEmailsThunk, clearEmailsThunk} from '../store/emails'
import AddOrderServices from './AddOrderServices'
import {clearSingleEmailThunk} from '../store/singleemail'
import OrderComments from './OrderComments'
import SingleOrderServices from './SingleOrderServices'
import moment from 'moment'

class SingleOrder extends Component {
	constructor(props) {
		super(props)
		this.handleServiceUpdate = this.handleServiceUpdate.bind(this)
		this.handleRemoveService = this.handleRemoveService.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.fetchEmails = this.fetchEmails.bind(this)
		this.state = {}
	}

	handleChange(evt) {
		if (!this.state[evt.target.id]) {
			this.setState({
				[evt.target.id]: {
					[evt.target.name]: evt.target.value,
				},
			})
		} else {
			let temp = this.state[evt.target.id]
			this.setState({
				[evt.target.id]: {...temp, [evt.target.name]: evt.target.value},
			})
		}
	}

	async fetchEmails() {
		let id = this.props.match.params.orderid
		try {
			await this.props.getEmails(id)
		} catch (err) {
			console.log(err)
		}
	}

	handleServiceUpdate(evt) {
		evt.preventDefault()
		let obj = {...this.state}
		let id = this.props.match.params.orderid
		this.props.updateServices(id, obj)
		obj = {}
		this.setState({})
	}

	handleRemoveService(evt) {
		let obj = {
			serviceid: evt.target.id,
		}
		let orderid = this.props.match.params.orderid
		this.props.removeService(orderid, obj)
		obj = {}
		this.setState({})
	}

	componentDidMount() {
		this.props.getOrder(this.props.match.params.orderid)
	}

	componentWillUnmount() {
		this.props.clearEmails()
		this.props.clearSingleEmail()
	}

	// eslint-disable-next-line complexity
	render() {
		const singleorder = this.props.order || {}
		const services = this.props.order.services || []

		let arr = []

		for (let [key, value] of Object.entries(singleorder)) {
			if (key !== 'services') {
				if (key === 'customer') {
					arr.push([`${key}`, `${value.firstName} ${value.lastName}`])
				} else if (
					key === 'dropoffDate' ||
					key === 'pickupDate' ||
					key === 'createdAt' ||
					key === 'updatedAt'
				) {
					let tempDate = moment(value).format('M/D/YY hh:mm A')
					arr.push([`${key}`, `${tempDate}`])
				} else {
					arr.push([`${key}`, `${value}`])
				}
			}
		}

		return (
			<div>
				<div>
					<OrderComments id={this.props.match.params.orderid} />
				</div>
				<div className='singleordercontainer'>
					<div className='singleordertable'>
						<h3 className='center'>Order Details</h3>
						<Table striped bordered hover variant='dark'>
							<tbody>
								{arr.map((details, index) => (
									<tr key={index}>
										<th>{details[0]}</th>
										<td>{details[1]}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
					<div className='invoiceform'>
						<UpdateOrder id={this.props.match.params.orderid} />
						<Invoice
							fetchEmails={this.fetchEmails}
							id={this.props.match.params.orderid}
						/>
						<SingleOrderServices services={services} />
					</div>
				</div>
				<br />

				<h3 className='gmailheader'>Order Email History</h3>
				<Gmail fetchEmails={this.fetchEmails} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		order: state.singleorder,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrder: id => dispatch(getSingleOrderThunk(id)),
		updateServices: (id, obj) => dispatch(updateOrderDetailsThunk(id, obj)),
		getEmails: id => dispatch(getEmailsThunk(id)),
		removeService: (id, obj) => dispatch(removeOrderServiceThunk(id, obj)),
		clearEmails: () => dispatch(clearEmailsThunk()),
		clearSingleEmail: () => dispatch(clearSingleEmailThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
)
