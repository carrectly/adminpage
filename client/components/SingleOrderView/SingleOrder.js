import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
	getSingleOrderThunk,
	updateOrderDetailsThunk,
	removeOrderServiceThunk,
} from '../../store/singleorder'
import SingleOrderEmails from './SingleOrderEmails'
import Invoice from './Invoice'

import {getEmailsThunk, clearEmailsThunk} from '../../store/emails'
import {clearSingleEmailThunk} from '../../store/singleemail'
import SingleOrderServices from './SingleOrderServices'
import SingleOrderDetails from './SingleOrderDetails'
import OrderComments from './OrderComments'
import './styles.scss'

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
		const customer = singleorder.customer || {}

		return (
			<div>
				<div className='singleordercontainer'>
					<div className='singleordertable'>
						<SingleOrderDetails
							order={singleorder}
							customer={customer}
						/>
						<SingleOrderEmails fetchEmails={this.fetchEmails} />
					</div>
					<div className='invoiceform'>
						<h3 className='sectionHeader'>Manage Order</h3>
						<Invoice
							fetchEmails={this.fetchEmails}
							id={this.props.match.params.orderid}
						/>
						<h3 className='sectionHeader'>Add Services</h3>
						<div className='singleOrderServices'>
							<SingleOrderServices services={services} />
						</div>
						<h3 className='sectionHeader'>Internal Comments</h3>
						<OrderComments id={this.props.match.params.orderid} />
					</div>
				</div>
				<br />
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
