import React from 'react'
import m from 'moment'
import {DeleteOrderServiceCell} from './Cells.js'
import UpdateOrderCharges from '../SingleOrderView/UpdateOrderCharges'

const columns = [
	{
		title: 'Service',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Customer Price',
		dataIndex: 'orderdetails',
		render: value => <div>{value.customerPrice}</div>,
	},
	{
		title: 'Dealer Price',
		dataIndex: 'orderdetails',
		render: value => <div>{value.dealerPrice}</div>,
	},
	{
		title: 'Edit',
		render: (value, row) => <UpdateOrderCharges value={value} row={row} />,
	},
	{
		title: 'Delete',
		render: (value, row) => (
			<DeleteOrderServiceCell value={value} row={row} />
		),
	},
]

export default columns
