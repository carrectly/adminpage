import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'antd'
import columns from '../Table/HomeTableColumns'

const TableOrdersByStatus = (props) => {
		const array = props.ordersArray || []

		return (
			<Table
				scroll={{x: 'max-content'}}
				columns={columns}
				dataSource={array}
				pagination={false}
				size='small'
				rowKey='hash'
			/>
		)

}

export default TableOrdersByStatus
