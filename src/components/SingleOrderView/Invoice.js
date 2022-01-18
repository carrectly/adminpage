import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
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
import {fetchDriversThunk} from '../../store/drivers.js'
import UpdateOrder from './UpdateOrder'

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

const Invoice = () => {
	const [invoiceBoolean, setInvoiceBoolean] = useState(false)
	const dispatch = useDispatch()
	const params = useParams()
	const orderId = params.orderid

	const customer = useSelector(state => state.square.singleCustomer)
	const invoice = useSelector(state => state.square.invoice)
	const order = useSelector(state => state.singleorder)
	const dealers = useSelector(state => state.dealers)

	useEffect(() => {
		dispatch(fetchDealersThunk())
		dispatch(fetchDriversThunk())
		return function cleanup() {
			dispatch(clearSquareThunk())
		}
	}, [])

	const openNotification1 = () => {
		const args = {
			message: customer.status,
			description: customer.status,
			duration: 6,
		}
		notification.open(args)
	}

	const openNotification2 = () => {
		const args = {
			message: invoice.id,
			description: invoice.id
				? 'Invoice created succesfully'
				: 'Failed to create invoice',
			duration: 6,
		}
		notification.open(args)
	}

	useEffect(() => {
		if (customer.id) {
			setInvoiceBoolean(true)
			openNotification1()
		}
	}, [customer])

	useEffect(() => {
		if (invoice.id) {
			setInvoiceBoolean(false)
			openNotification2()
		}
	}, [invoice])

	const checkCustomerInSquare = phone => {
		dispatch(getSquareCustomerThunk(phone))
	}

	const createInvoice = customerId => {
		dispatch(createInvoiceThunk(order, customerId))
	}

	const handleSend = e => {
		let obj = {}
		obj.email = e.key
		obj.year = order.carYear
		obj.make = order.carMake
		obj.model = order.carModel
		obj.vin = order.vin
		obj.orderid = orderId
		try {
			dispatch(sendSingleEmailThunk(obj))
			dispatch(getEmailsThunk(obj))
		} catch (err) {
			console.log(err)
		}

		obj = {}
	}

	return (
		<div className='invoicebuttons'>
			<UpdateOrder id={orderId} />
			<Dropdown overlay={() => dealerList(dealers, handleSend)}>
				<Button shape='round' size='large'>
					Create draft email for shops <DownOutlined />
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
					onClick={() =>
						checkCustomerInSquare(order.customerPhoneNumber)
					}>
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
					disabled={!invoiceBoolean}
					onClick={() => createInvoice(customer.id)}>
					Create Invoice
				</Button>
			</Popover>
		</div>
	)
}

export default Invoice
