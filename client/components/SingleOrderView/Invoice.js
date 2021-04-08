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
import {updateSingleOrderThunk} from '../../store/singleorder'
import {getStatusArray} from '../util'
import UpdateOrder from './UpdateOrder'

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

	const handleStatusUpdate = e => {
		console.log('changing status evt', e.key)
		let obj = {
			status: e.key,
		}
		if (e.key === 'cancelled') {
			if (
				window.confirm(
					'Changing the status to cancelled will remove the order from the home page and will move it to archives. Do you want to proceed?'
				)
			) {
				dispatch(updateSingleOrderThunk(orderId, obj))
			} else {
				console.log('changed my mind')
			}
		} else if (e.key === 'paid') {
			if (
				window.confirm(
					'Changing the status to paid will remove the order from the home page and will move it to archives. Do you want to proceed?'
				)
			) {
				dispatch(updateSingleOrderThunk(orderId, obj))
			} else {
				console.log('changed my mind')
			}
		} else {
			dispatch(updateSingleOrderThunk(orderId, obj))
		}
	}

	const handleDriverUpdate = evt => {
		dispatch(updateSingleOrderThunk(orderId, {concierge: evt.key}))
	}

	return (
		<div className='invoicebuttons'>
			<UpdateOrder id={orderId} />
			<Dropdown overlay={() => menuList(handleStatusUpdate)}>
				<Button shape='round' size='large'>
					Change status <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={() => dealerList(dealers, handleSend)}>
				<Button shape='round' size='large'>
					Create draft email for shops <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={() => driversList(handleDriverUpdate)}>
				<Button shape='round' size='large'>
					Assign pick up Driver <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={() => driversList(handleDriverUpdate)}>
				<Button shape='round' size='large'>
					Assign drop off Driver <DownOutlined />
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
