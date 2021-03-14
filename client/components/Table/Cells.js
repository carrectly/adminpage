import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deleteOrderThunk} from '../../store/archivedOrders'
import {deleteContactThunk} from '../../store/contacts'
import {removeOrderServiceThunk} from '../../store/singleorder'
import {getStatusArray} from '../util'
import {EnvironmentFilled, DeleteFilled} from '@ant-design/icons'

export const DateCell = ({value}) => {
	if (value) {
		return <span>{moment(value).format('M/D/YY hh:mm A')}</span>
	} else {
		return <div />
	}
}

export const CustomerNameCell = ({value, row}) => (
	<Link to={`/singlecustomer/${row.customerPhoneNumber}`}>
		{value.firstName} {value.lastName}
	</Link>
)

export const CustomerPhoneCell = ({value}) => (
	<Link to={`/singlecustomer/${value}`}>{value}</Link>
)

export const OrderDetailsCell = ({value}) => (
	<Link to={`/singleorder/${value}`}>Details</Link>
)

export const DeleteOrderCell = ({value}) => {
	const dispatch = useDispatch()
	const handleClick = evt => {
		evt.preventDefault()
		if (
			window.confirm(
				'Are you sure you want to delete this order from the database?'
			)
		) {
			if (evt.target.id) {
				dispatch(deleteOrderThunk(evt.target.id))
			}
		} else {
			console.log('changed my mind')
		}
	}

	return (
		<Button id={value} onClick={handleClick} type='primary'>
			<DeleteFilled style={{color: 'red'}} />
		</Button>
	)
}

export const LocationCell = ({value}) => {
	return (
		<a
			onClick={() =>
				window.open(`https://maps.google.com/?q=${value}`, '_blank')
			}>
			<EnvironmentFilled />
			{value}
		</a>
	)
}

export const DeleteCustomerCell = ({value}) => {
	const dispatch = useDispatch()
	const handleClick = evt => {
		evt.preventDefault()
		if (
			window.confirm(
				'Are you sure you want to delete this customer from the database?'
			)
		) {
			if (evt.target.id) {
				dispatch(deleteContactThunk(evt.target.id))
			}
		} else {
			console.log('changed my mind')
		}
	}

	return (
		<Button id={value} onClick={handleClick} type='primary'>
			<DeleteFilled style={{color: 'red'}} />
		</Button>
	)
}

export const DeleteOrderServiceCell = ({row}) => {
	const dispatch = useDispatch()

	const handleRemoveService = () => {
		dispatch(
			removeOrderServiceThunk(row.orderdetails.orderHash, {
				serviceid: row.id,
			})
		)
	}

	return (
		<Button id={row.id} onClick={handleRemoveService} type='text'>
			<DeleteFilled style={{color: 'red'}} />
		</Button>
	)
}

export const StatusCell = ({value}) => {
	const statusArray = getStatusArray()
	const index = statusArray.indexOf(value)

	let classname = `status${index}`

	return <div className={classname}>{value}</div>
}
