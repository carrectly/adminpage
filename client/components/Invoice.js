import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {notification} from 'antd'
import {
	getSquareCustomerThunk,
	createInvoiceThunk,
	clearSquareThunk,
} from '../store/square'
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
import {getStatusArray} from './util'
let cust
let invoice
const statusArray = getStatusArray()

const openNotification = () => {
	const args = {
		message: 'Notification Title',
		description:
			'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
		duration: 6,
	}
	notification.open(args)
}

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

	componentWillUnmount() {
		this.props.clearSquare()
	}

	handleClick(obj) {
		openNotification()
		// this.props.getSquareCustomer(obj)
		// this.setState({
		// 	invoice: false,
		// })
	}

	async handleSend(evt) {
		let obj = {}
		obj.email = evt.target.id
		obj.year = this.props.order.carYear
		obj.make = this.props.order.carMake
		obj.model = this.props.order.carModel
		obj.vin = this.props.order.vin
		obj.orderid = this.props.order.hash
		try {
			await this.props.sendEmail(obj)
			await this.props.fetchEmails()
		} catch (err) {
			console.log(err)
		}

		obj = {}
	}

	handleStatusUpdate(evt) {
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
			<div className='invoicebuttons'>
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
					title='Create Email Draft Quote Request'
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

				<OverlayTrigger
					placement='left'
					overlay={
						<Tooltip id='tooltip-left'>
							If customer does not exist in{' '}
							<strong>square</strong>, this button will create a
							new customer. Can't create an invoice until we check
							if the customer exists in <strong>square</strong>.
						</Tooltip>
					}>
					<Button
						size='lg'
						block
						variant='primary'
						onClick={() => this.handleClick(this.props.order)}>
						Check if customer exists in Square
					</Button>
				</OverlayTrigger>

				<OverlayTrigger
					placement='left'
					overlay={
						<Tooltip id='tooltip-left'>
							Can't create an invoice until we check if the user
							exists in <strong>square</strong>.
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
		customer: state.square.singleCustomer,
		invoice: state.square.invoice,
		order: state.singleorder,
		dealers: state.dealers,
	}
}
const mapDispatchToProps = dispatch => {
	return {
		getSquareCustomer: obj => dispatch(getSquareCustomerThunk(obj)),
		clearSquare: () => dispatch(clearSquareThunk()),
		createInvoice: (obj, str) => dispatch(createInvoiceThunk(obj, str)),
		fetchDealers: () => dispatch(fetchDealersThunk()),
		sendEmail: obj => dispatch(sendSingleEmailThunk(obj)),
		getEmails: id => dispatch(getEmailsThunk(id)),
		updateStatus: (id, obj) => dispatch(updateSingleOrderThunk(id, obj)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoice))
