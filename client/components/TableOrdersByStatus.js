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
import columns from './Table/Columns'

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
