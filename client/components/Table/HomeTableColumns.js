import React from 'react'
import m from 'moment'
import {
	DateCell,
	OrderDetailsCell,
	CustomerNameCell,
	StatusCell,
	LocationCell,
} from './Cells.js'

const defaultStringCompareOptions = {sensitivity: 'base'}

const columns = [
	{
		title: 'Order Link',
		dataIndex: 'hash',
		key: 'hash',
		render: (value, row) => <OrderDetailsCell value={value} row={row} />,
	},
	{
		title: 'Customer Phone #',
		dataIndex: 'customerPhoneNumber',
		key: 'customerPhoneNumber',
	},
	{
		title: 'status',
		dataIndex: 'status',
		align: 'center',
		key: 'status',
		sorter: (a, b) =>
			a.status.localeCompare(b.status, defaultStringCompareOptions),
		sortDirections: ['descend', 'ascend'],
		render: value => <StatusCell value={value} />,
	},
	{
		title: 'carMake',
		dataIndex: 'carMake',
		key: 'carMake',
	},
	{
		title: 'carModel',
		dataIndex: 'carModel',
		key: 'carModel',
	},
	{
		title: 'Customer Name',
		dataIndex: 'customer',
		key: 'customer',
		render: (value, row) => <CustomerNameCell value={value} row={row} />,
	},
	{
		title: 'pickupLocation',
		dataIndex: 'pickupLocation',
		key: 'pickupLocation',
		render: value => <LocationCell value={value} />,
	},
	{
		title: 'pickupDate',
		dataIndex: 'pickupDate',
		key: 'pickupDate',
		defaultSortOrder: 'descend',
		sorter: (a, b) => m(a.pickupDate).diff(m(b.pickupDate)),
		sortDirections: ['descend', 'ascend'],
		render: value => <DateCell value={value} />,
	},
	{
		title: 'dropoffDate',
		dataIndex: 'dropoffDate',
		key: 'dropoffDate',
		sorter: (a, b) => m(a.pickupDate).diff(m(b.pickupDate)),
		sortDirections: ['descend', 'ascend'],
		render: value => <DateCell value={value} />,
	},
]

export default columns
