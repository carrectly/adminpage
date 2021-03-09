import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deleteOrderThunk} from '../../store/archivedOrders'
import {deleteContactThunk} from '../../store/contacts'
import {getStatusArray} from '../util'
import {Tag} from 'antd'

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

export const ServicesCell = ({value, row}) => {
	return value.map(el => (
		<Tag color='magenta' key={el.id}>
			{el.name}
		</Tag>
	))
}

export const CustomerPhoneCell = ({value}) => (
	<Link to={`/singlecustomer/${value}`}>{value}</Link>
)

export const OrderDetailsCell = ({value}) => (
	<Link to={`/singleorder/${value}`}>{value}</Link>
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
		<Button id={value} onClick={handleClick} variant='danger'>
			Delete
		</Button>
	)
}

export const LocationCell = ({value}) => {
	return (
		<Link
			onClick={() =>
				window.open(`https://maps.google.com/?q=${value}`, '_blank')
			}>
			{value}
		</Link>
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

export const ConciergeCell = ({value}) => {
	const arr = ['Stas', 'Mike', 'Taras', 'Ben', 'Kyle', 'Other']
	const i = arr.indexOf(value)
	const colors = [
		'#FF1493',
		'#0000FF',
		'#DAA520',
		'#228B22',
		'#FF6347',
		'#008080',
	]

	return (
		<Tag color={colors[i]} key={value}>
			{value}
		</Tag>
	)
}
