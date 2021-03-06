import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Table} from 'antd'
import columns from '../Table/HomeTableColumns'

class TableOrdersByStatus extends Component {
	render() {
		const array = this.props.ordersArray || []

		return (
			<Table
				scroll={{x: 1500}}
				columns={columns}
				dataSource={array}
				pagination={false}
				size='small'
				rowKey='hash'
			/>
		)
	}
}

export default withRouter(connect(null, null)(TableOrdersByStatus))
