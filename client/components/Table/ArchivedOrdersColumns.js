import React from 'react'
import m from 'moment'
import getColumnSearchProps from './ColumnFilter.js'
import {
	DateCell,
	OrderDetailsCell,
	DeleteOrderCell,
	CustomerNameCell,
	LocationCell,
} from './Cells.js'

const defaultStringCompareOptions = {sensitivity: 'base'}

const ArchivedOrdersColumns = (
	searchInput,
	searchText,
	searchedColumn,
	handleSearch,
	handleReset
) => [
	{
		title: 'Order Link',
		dataIndex: 'hash',
		key: 'hash',
		width: '10%',
		render: value => <OrderDetailsCell value={value} />,
	},
	{
		title: 'status',
		dataIndex: 'status',
		key: 'name',
		width: '10%',
		sorter: (a, b) =>
			a.status.localeCompare(b.status, defaultStringCompareOptions),
		...getColumnSearchProps(
			'status',
			searchInput,
			searchText,
			searchedColumn,
			handleSearch,
			handleReset
		),
	},
	{
		title: 'carMake',
		dataIndex: 'carMake',
		key: 'age',
		width: '10%',
		...getColumnSearchProps(
			'carMake',
			searchInput,
			searchText,
			searchedColumn,
			handleSearch,
			handleReset
		),
	},
	{
		title: 'carModel',
		dataIndex: 'carModel',
		key: 'carModel',
		width: '10%',
		...getColumnSearchProps(
			'carModel',
			searchInput,
			searchText,
			searchedColumn,
			handleSearch,
			handleReset
		),
	},
	{
		title: 'Customer Phone #',
		dataIndex: 'customerPhoneNumber',
		key: 'customerPhoneNumber',
		width: '20%',
		...getColumnSearchProps(
			'customerPhoneNumber',
			searchInput,
			searchText,
			searchedColumn,
			handleSearch,
			handleReset
		),
	},
	{
		title: 'Customer Name',
		dataIndex: 'customer',
		key: 'customer',
		width: '20%',
		sorter: (a, b) =>
			a.customer.localeCompare(b.customer, defaultStringCompareOptions),
		render: (value, row) => <CustomerNameCell value={value} row={row} />,
	},
	{
		title: 'pickupLocation',
		dataIndex: 'pickupLocation',
		key: 'pickupLocation',
		...getColumnSearchProps(
			'pickupLocation',
			searchInput,
			searchText,
			searchedColumn,
			handleSearch,
			handleReset
		),
		render: value => <LocationCell value={value} />,
	},
	{
		title: 'pickupDate',
		dataIndex: 'pickupDate',
		key: 'pickupDate',
		sorter: (a, b) => m(a.pickupDate).diff(m(b.pickupDate)),
		render: value => <DateCell value={value} />,
	},
	{
		title: 'updatedAt',
		dataIndex: 'updatedAt',
		key: 'updatedAt',
		sorter: (a, b) => m(a.updatedAt).diff(m(b.updatedAt)),
		render: value => <DateCell value={value} />,
	},
	{
		title: 'Delete Order',
		dataIndex: 'hash',
		key: 'hash',
		width: '10%',
		render: value => <DeleteOrderCell value={value} />,
	},
]

export default ArchivedOrdersColumns
