import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getStripeCustomerThunk, createInvoiceThunk} from '../store/stripe'
import {
	DropdownButton,
	Dropdown,
	Button,
	ButtonToolbar,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap'
import {fetchDealersThunk} from '../store/dealers.js'
import {sendSingleEmailThunk} from '../store/singleemail'
import {getEmailsThunk} from '../store/emails'
import {updateSingleOrderThunk} from '../store/singleorder'

let cust
let invoice
const statusArray = [
	'received',
	'waiting on quote',
	'quote approved - getting serviced',
	'completed - pending invoice',
	'completed - invoice sent',
	'completed - paid',
]

class Invoice extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleSend = this.handleSend.bind(this)
		this.handleStatusUpdate = this.handleStatusUpdate.bind(this)
		this.state = {
			invoice: true,
		}
	}

	componentDidMount() {
		this.props.fetchDealers()
	}
	componentDidUpdate() {
		cust = this.props.customer.id
	}

	handleClick(obj) {
		this.props.getStripeCustomer(obj)
		this.setState({
			invoice: false,
		})
	}

	async handleSend(evt) {
		let obj = {}
		obj.email = evt.target.id
		obj.year = this.props.order.year
		obj.make = this.props.order.make
		obj.model = this.props.order.model
		obj.orderid = this.props.order.hash
		await this.props.sendEmail(obj)
		obj = {}
		await this.props.fetchEmails()
	}

	handleStatusUpdate(evt) {
		console.log('evt', evt.target)
		let obj = {
			status: evt.target.name,
		}
		let id = this.props.id
		this.props.updateStatus(id, obj)
		obj = {}
	}

	render() {
		cust = this.props.customer.id || null
		invoice = this.props.invoice.id || null
		let dealers = this.props.dealers || []
		return (
			<div>
				<DropdownButton
					size='lg'
					id='dropdown-basic-button'
					title='Change Status'
					className='btn-block'>
					{statusArray.map((status, index) => (
						<Dropdown.Item
							key={index}
							id={index}
							name={status}
							onClick={this.handleStatusUpdate}>
							{status}
						</Dropdown.Item>
					))}
				</DropdownButton>
				<DropdownButton
					size='lg'
					id='dropdown-basic-button'
					title='Send Quote Request'
					className='btn-block'>
					{dealers.map(dlr => (
						<Dropdown.Item
							key={dlr.id}
							id={dlr.email}
							onClick={this.handleSend}>
							{dlr.name}
						</Dropdown.Item>
					))}
				</DropdownButton>

				<ButtonToolbar>
					<OverlayTrigger
						key='left'
						placement='left'
						overlay={
							<Tooltip id='tooltip-left'>
								If customer does not exist in{' '}
								<strong>stripe</strong>, this button will create
								a new customer. Can't create an invoice until we
								check if the customer exists in{' '}
								<strong>stripe</strong>.
							</Tooltip>
						}>
						<Button
							size='lg'
							block
							variant='primary'
							onClick={() => this.handleClick(this.props.order)}>
							Check if customer exists in Stripe
						</Button>
					</OverlayTrigger>
				</ButtonToolbar>

				<ButtonToolbar>
					<OverlayTrigger
						key='left'
						placement='left'
						overlay={
							<Tooltip id='tooltip-left'>
								Can't create an invoice until we check if the
								user exists in <strong>stripe</strong>.
							</Tooltip>
						}>
						<Button
							size='lg'
							block
							variant='primary'
							disabled={this.state.invoice}
							onClick={() =>
								this.props.createInvoice(
									this.props.order,
									this.props.customer.id
								)
							}>
							Create Invoice
						</Button>
					</OverlayTrigger>
				</ButtonToolbar>

				<div>
					{cust ? <div>{this.props.customer.status}</div> : <div />}
					{invoice ? <div>Invoice created succesfully</div> : <div />}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		customer: state.stripe.singleCustomer,
		invoice: state.stripe.invoice,
		order: state.singleorder,
		dealers: state.dealers,
	}
}
const mapDispatchToProps = dispatch => {
	return {
		getStripeCustomer: obj => dispatch(getStripeCustomerThunk(obj)),
		createInvoice: (obj, str) => dispatch(createInvoiceThunk(obj, str)),
		fetchDealers: () => dispatch(fetchDealersThunk()),
		sendEmail: obj => dispatch(sendSingleEmailThunk(obj)),
		getEmails: id => dispatch(getEmailsThunk(id)),
		updateStatus: (id, obj) => dispatch(updateSingleOrderThunk(id, obj)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoice))
