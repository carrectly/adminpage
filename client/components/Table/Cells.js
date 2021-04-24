import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Tag, Popover} from 'antd'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deleteOrderThunk} from '../../store/archivedOrders'
import {deleteContactThunk} from '../../store/contacts'
import {removeOrderServiceThunk} from '../../store/singleorder'
import {getStatusArray} from '../util'
import {
	EnvironmentFilled,
	DeleteFilled,
	GooglePlusCircleFilled,
	DownOutlined,
} from '@ant-design/icons'

export const DateCell = ({value}) => {
	if (value) {
		return (
			<div>
				<span>{moment(value).format('M/D/YY')}</span>
				<br />
				<span className='subtext'>
					{moment(value).format('hh:mm A')}
				</span>
			</div>
		)
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
		<Button id={value} onClick={handleClick} type='text'>
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
		<Button id={value} onClick={handleClick} type='text'>
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

export const StatusCell = ({value, dropDown = false}) => {
	const statusArray = getStatusArray()
	const index = statusArray.indexOf(value)

	let classname = `status${index}`

	return (
		<div className={classname}>
			{value} {dropDown ? <DownOutlined /> : <div />}
		</div>
	)
}

export const ConciergeCell = ({value, dropDown = false}) => {
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

	if (dropDown) {
		return (
			<Tag
				color={colors[value.id]}
				key={value.id}
				style={{margin: '0px', border: '0px'}}>
				{value.name} {dropDown ? <DownOutlined /> : <div />}
			</Tag>
		)
	}

	return (
		<Tag color={colors[i]} key={value}>
			{value} {dropDown ? <DownOutlined /> : <div />}
		</Tag>
	)
}

export const GoogleVoiceLinkCell = ({value}) => (
	<Popover
		placement='bottom'
		content='Click to view google voice conversation'
		trigger='hover'>
		<a
			onClick={() =>
				window.open(
					`https://voice.google.com/u/1/messages?itemId=t.%2B${value}`,
					'_blank'
				)
			}>
			{value}
			<GooglePlusCircleFilled />
		</a>
	</Popover>
)
