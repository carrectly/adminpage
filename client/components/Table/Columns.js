import React from 'react'
import {
	DateCell,
	OrderDetailsCell,
	CustomerNameCell,
	StatusCell,
} from './Cells.js'

const columns = [
	{
		title: 'Order Link',
		dataIndex: 'hash',
		key: 'hash',
		width: 50,
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
		width: 130,
		key: 'name',
		render: value => <StatusCell value={value} />,
	},
	{
		title: 'carMake',
		dataIndex: 'carMake',
		key: 'age',
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
	},
	{
		title: 'pickupDate',
		dataIndex: 'pickupDate',
		key: 'pickupDate',
		render: value => <DateCell value={value} />,
	},
]

export default columns
