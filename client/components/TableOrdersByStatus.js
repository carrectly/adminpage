import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
// import {Table, Card, Accordion, Button} from 'react-bootstrap'
import {Table, Input, Button, Space} from 'antd'
import moment from 'moment'
import OrdersTableHeader from './OrdersTableHeader'
import {
	DateCell,
	CustomerInfoCell,
	OrderDetailsCell,
	CustomerNameCell,
} from './util'

const columns = [
	{
		title: 'Order Link',
		dataIndex: 'hash',
		key: 'hash',
		render: value => <OrderDetailsCell value={value} />,
	},
	{
		title: 'Customer Phone #',
		dataIndex: 'customerPhoneNumber',
		key: 'customerPhoneNumber',
	},
	{
		title: 'Customer Info',
		dataIndex: 'customerPhoneNumber',
		key: 'customerPhoneNumber',
		render: value => <CustomerInfoCell value={value} />,
	},
	{
		title: 'status',
		dataIndex: 'status',
		key: 'name',
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

class TableOrdersByStatus extends Component {
	render() {
		const array = this.props.ordersArray || []

		return (
			<Table
				columns={columns}
				dataSource={array}
				pagination={false}
				size='small'
			/>
		)
	}
}

export default withRouter(connect(null, null)(TableOrdersByStatus))
