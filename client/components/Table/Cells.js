import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deleteOrderThunk} from '../../store/archivedOrders'
import {deleteContactThunk} from '../../store/contacts'
import {getStatusArray} from '../util'

export const DateCell = ({value}) => (
	<span>{moment(value).format('M/D/YY hh:mm A')}</span>
)

export const CustomerInfoCell = ({value}) => (
	<Link to={`/singlecustomer/${value}`}>Customer Info</Link>
)

export const CustomerNameCell = ({value, row}) => (
	<Link to={`/singlecustomer/${row.customerPhoneNumber}`}>
		{value.firstName} {value.lastName}
	</Link>
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

export const StatusCell = ({value}) => {
	const statusArray = getStatusArray()
	const index = statusArray.indexOf(value)

	let classname = `status${index}`

	return <div className={classname}>{value}</div>
}
