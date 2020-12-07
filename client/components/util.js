import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

export const getStatusArray = () => {
	return [
		'booked',
		'quote',
		'quoted',
		'in process',
		'returned',
		'invoiced',
		'done',
		'cancelled',
	]
}

export const getActiveStatusArray = () => {
	return ['booked', 'quote', 'quoted', 'in process', 'returned', 'invoiced']
}

export const getCompletedStatusArray = () => {
	return ['done', 'cancelled']
}

export const DateCell = ({value}) => (
	<span>{moment(value).format('M/D/YY hh:mm A')}</span>
)

export const CustomerInfoCell = ({value}) => (
	<Link to={`/singlecustomer/${value}`}>Customer Info</Link>
)

export const OrderDetailsCell = ({value}) => (
	<Link to={`/singleorder/${value}`}>View Details</Link>
)
