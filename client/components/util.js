import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deleteOrderThunk} from '../store/archivedOrders'
import {deleteContactThunk} from '../store/contacts'

export const getStatusArray = () => {
	return [
		'booked new',
		'booked us',
		'followed up - text',
		'followed up - call',
		'followed up - email',
		'cancelled',
		'confirmed',
		'in process',
		'pending work approvals',
		'ready to be returned',
		'returned',
		'quote inquired by customer',
		'quote sent to a shop',
		'quote sent to a customer',
		'invoiced',
		'paid',
		'postponed',
	]
}

export const getTakeActionStatusArray = () => {
	return [
		'booked new',
		'booked us',
		'followed up - text',
		'followed up - call',
		'followed up - email',
	]
}

export const getWorkZoneStatusArray = () => {
	return [
		'confirmed',
		'in process',
		'pending work approvals',
		'ready to be returned',
	]
}

export const getInvoicesStatusArray = () => {
	return ['returned', 'invoiced']
}

export const getQuotesStatusArray = () => {
	return [
		'quote inquired by customer',
		'quote sent to a shop',
		'quote sent to a customer',
	]
}

export const getPotentialLeadsStatusArray = () => {
	return ['postponed']
}

export const getOrderTableColumns = () => {
	return [
		{
			title: 'Order Link',
			dataIndex: 'hash',
			key: 'hash',
			width: '10%',
			render: value => <OrderDetailsCell value={value} />,
		},
		{
			title: 'Customer Phone #',
			dataIndex: 'customerPhoneNumber',
			key: 'customerPhoneNumber',
			width: '20%',
		},
		{
			title: 'Customer Info',
			dataIndex: 'customerPhoneNumber',
			key: 'customerPhoneNumber',
			width: '10%',
			render: value => <CustomerInfoCell value={value} />,
		},
		{
			title: 'status',
			dataIndex: 'status',
			key: 'name',
			width: '10%',
		},
		{
			title: 'carMake',
			dataIndex: 'carMake',
			key: 'age',
			width: '10%',
		},
		{
			title: 'carModel',
			dataIndex: 'carModel',
			key: 'carModel',
			width: '10%',
		},
		{
			title: 'Customer Name',
			dataIndex: 'customer',
			key: 'customer',
			width: '20%',
			render: value => <CustomerNameCell value={value} />,
		},
		{
			title: 'pickupLocation',
			dataIndex: 'pickupLocation',
			key: 'pickupLocation',
		},
		{
			title: 'pickupDate',
			dataIndex: 'pickupDate',
			key: 'pickupDate',
			render: value => <DateCell value={value} />,
		},
	]
}

export const DateCell = ({value}) => (
	<span>{moment(value).format('M/D/YY hh:mm A')}</span>
)

export const CustomerInfoCell = ({value}) => (
	<Link to={`/singlecustomer/${value}`}>Customer Info</Link>
)

export const CustomerNameCell = ({value}) => (
	<span>
		{value.firstName} {value.lastName}
	</span>
)

export const OrderDetailsCell = ({value}) => (
	<Link to={`/singleorder/${value}`}>{value}</Link>
)

export const DeleteOrderCell = ({value}) => {
	const dispatch = useDispatch()
	const handleClick = evt => {
		evt.preventDefault()
		if (evt.target.id) {
			dispatch(deleteOrderThunk(evt.target.id))
		}
	}
	return (
		<Button id={value} onClick={handleClick} variant='danger'>
			Delete
		</Button>
	)
}

export const DeleteCustomerCell = ({value}) => {
	const dispatch = useDispatch()
	const handleClick = evt => {
		evt.preventDefault()
		if (evt.target.id) {
			dispatch(deleteContactThunk(evt.target.id))
		}
	}
	return (
		<Button id={value} onClick={handleClick} variant='danger'>
			Delete
		</Button>
	)
}
