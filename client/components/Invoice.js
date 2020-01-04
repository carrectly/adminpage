import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getStripeCustomerThunk, createInvoiceThunk} from '../store/stripe'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'
import {fetchDealersThunk} from '../store/dealers.js'
import {sendSingleEmailThunk} from '../store/singleemail'
import {getEmailsThunk} from '../store/emails'

let cust

class Invoice extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleSend = this.handleSend.bind(this)
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
		this.props.sendEmail(obj)
		await this.props.fetchEmails()
		obj = {}
	}

	render() {
		cust = this.props.customer.id || null
		let dealers = this.props.dealers || []
		return (
			<div>
				<p>Can't create an invoice until the status is "completed" </p>
				<p>
					Can't create an invoice until we check if the user exists in
					stripe
				</p>

				<DropdownButton
					size='lg'
					id='dropdown-basic-button'
					title='Change Status'
					className='btn-block'>
					<Dropdown.Item href='#/action-1'>Received</Dropdown.Item>
					<Dropdown.Item href='#/action-2'>
						Waiting on Quote
					</Dropdown.Item>
					<Dropdown.Item href='#/action-3'>
						Quote Approved - getting Serviced
					</Dropdown.Item>
					<Dropdown.Item href='#/action-4'>
						Completed - pending invoice
					</Dropdown.Item>
					<Dropdown.Item href='#/action-5'>
						Completed - invoice sent
					</Dropdown.Item>
					<Dropdown.Item href='#/action-6'>
						Completed - invoice paid
					</Dropdown.Item>
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

				<Button
					size='lg'
					block
					variant='primary'
					onClick={() => this.handleClick(this.props.order)}>
					Check if customer exists in Stripe
				</Button>
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
				<div>
					{cust ? <div>{this.props.customer.status}</div> : <div />}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		customer: state.stripe.singleCustomer,
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
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoice))
