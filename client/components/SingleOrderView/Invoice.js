import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {notification, Button, Dropdown, Popover, Menu} from 'antd'
import {
	getSquareCustomerThunk,
	createInvoiceThunk,
	clearSquareThunk,
} from '../../store/square'
import {DownOutlined} from '@ant-design/icons'
import {fetchDealersThunk} from '../../store/dealers.js'
import {sendSingleEmailThunk} from '../../store/singleemail'
import {getEmailsThunk} from '../../store/emails'
import {updateSingleOrderThunk} from '../../store/singleorder'
import {getStatusArray} from '../util'
import UpdateOrder from './UpdateOrder'

let cust
let invoice
const statusArray = getStatusArray()

const driversArray = ['Stas', 'Mike', 'Taras', 'Ben', 'Kyle', 'Other']

const menuList = fn => {
	return (
		<Menu onClick={fn}>
			{statusArray.map((status, index) => (
				<Menu.Item key={status} id={index}>
					{status}
				</Menu.Item>
			))}
		</Menu>
	)
}

const driversList = fn => {
	return (
		<Menu onClick={fn}>
			{driversArray.map((driver, index) => (
				<Menu.Item key={driver} id={index}>
					{driver}
				</Menu.Item>
			))}
		</Menu>
	)
}

const dealerList = (arr, fn) => {
	return (
		<Menu onClick={fn}>
			{arr.map((dlr, index) => (
				<Menu.Item key={dlr.email} id={index}>
					{dlr.name}
				</Menu.Item>
			))}
		</Menu>
	)
}

class Invoice extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleSend = this.handleSend.bind(this)
		this.handleStatusUpdate = this.handleStatusUpdate.bind(this)
		this.handleCreateInvoice = this.handleCreateInvoice.bind(this)
		this.openNotification1 = this.openNotification1.bind(this)
		this.openNotification2 = this.openNotification2.bind(this)
		this.handleDriverUpdate = this.handleDriverUpdate.bind(this)
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

	async handleClick(obj) {
		await this.props.getSquareCustomer(obj)
		this.setState({
			invoice: false,
		})
		this.openNotification1()
	}

	async handleCreateInvoice(order, customerId) {
		await this.props.createInvoice(order, customerId)
		this.openNotification2()
	}

	openNotification1 = () => {
		const args = {
			message: this.props.customer.status,
			description: this.props.customer.status,
			duration: 6,
		}
		notification.open(args)
	}

	openNotification2 = () => {
		let description
		if (this.props.invoice.id) {
			description = 'Invoice created succesfully'
		} else {
			description = 'Failed to create invoice'
		}
		const args = {
			message: this.props.invoice.id,
			description: description,
			duration: 6,
		}
		notification.open(args)
	}

	async handleSend(e) {
		let obj = {}
		obj.email = e.key
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

	handleStatusUpdate(e) {
		console.log('changing status evt', e.key)
		let obj = {
			status: e.key,
		}
		let id = this.props.id
		if (e.key === 'cancelled') {
			if (
				window.confirm(
					'Changing the status to cancelled will remove the order from the home page and will move it to archives. Do you want to proceed?'
				)
			) {
				this.props.updateStatus(id, obj)
			} else {
				console.log('changed my mind')
			}
		} else if (e.key === 'paid') {
			if (
				window.confirm(
					'Changing the status to paid will remove the order from the home page and will move it to archives. Do you want to proceed?'
				)
			) {
				this.props.updateStatus(id, obj)
			} else {
				console.log('changed my mind')
			}
		} else {
			this.props.updateStatus(id, obj)
		}
	}

	handleDriverUpdate(evt) {
		let obj = {
			concierge: evt.target.name,
		}
		let id = this.props.id
		this.props.updateStatus(id, obj)
	}

	render() {
		cust = this.props.customer.id || null
		invoice = this.props.invoice.id || null
		let dealers = this.props.dealers || []
		return (
			<div className='invoicebuttons'>
				<UpdateOrder id={this.props.order.hash} />
				<Dropdown overlay={() => menuList(this.handleStatusUpdate)}>
					<Button shape='round'>
						Change status <DownOutlined />
					</Button>
				</Dropdown>
				<Dropdown overlay={() => dealerList(dealers, this.handleSend)}>
					<Button shape='round'>
						Create draft email for shops <DownOutlined />
					</Button>
				</Dropdown>
				<Dropdown overlay={() => driversList(this.handleDriverUpdate)}>
					<Button shape='round'>
						Assign Concierge <DownOutlined />
					</Button>
				</Dropdown>
				<Popover
					placement='bottom'
					content="If customer does not exist in
							square, this button will create a new customer. Can't create an invoice until we check
							if the customer exists in square">
					<Button
						size='large'
						block
						shape='round'
						onClick={() => this.handleClick(this.props.order)}>
						Check if customer exists in Square
					</Button>
				</Popover>
				<Popover
					placement='bottom'
					content="Can't create an invoice until we check if the user
							exists in square.">
					<Button
						size='large'
						block
						shape='round'
						disabled={this.state.invoice}
						onClick={() =>
							this.handleCreateInvoice(
								this.props.order,
								this.props.customer.id
							)
						}>
						Create Invoice
					</Button>
				</Popover>
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
