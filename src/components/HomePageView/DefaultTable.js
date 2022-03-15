import React from 'react'
import {Table} from 'antd'
import defaultColumns from '../Table/HomeTableColumns'
import './tablestyles.scss'
import m from 'moment'

const rowColor = (record, index) => {
	const timeNow = m()
	const differrence = m(record.dropoffDate).diff(timeNow, 'hours', true)
	if (differrence < 1) {
		return 'one-hour-red'
	}
	if (differrence < 2) {
		return 'two-hour-yellow'
	}
	return 'basic-test'
}

const DefaultTable = props => {
	const array = props.ordersArray || []
	const cols = props.columns || defaultColumns
	const pagination = props.pagination || false
	const type = props.type

	if (type === 'trips') {
		return (
			<Table
				scroll={{x: 'max-content'}}
				columns={cols}
				dataSource={array}
				pagination={pagination}
				size='small'
				rowKey='hash'
				rowClassName={(record, index) => rowColor(record, index)}
			/>
		)
	} else {
		return (
			<Table
				scroll={{x: 'max-content'}}
				columns={cols}
				dataSource={array}
				pagination={pagination}
				size='small'
				rowKey='hash'
			/>
		)
	}
}

export default DefaultTable
