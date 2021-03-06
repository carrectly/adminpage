import React, {useState, useRef} from 'react'
import {Table} from 'antd'
import {useSelector} from 'react-redux'
import ArchivedOrdersColumns from '../Table/ArchivedOrdersColumns'

const AntDOrdersTable = props => {
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	let searchInput = useRef(null)

	const ordersArr = useSelector(state => state.archivedOrders)

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = clearFilters => {
		clearFilters()
		setSearchText('')
	}

	const columns = ArchivedOrdersColumns(
		searchInput,
		searchText,
		searchedColumn,
		handleSearch,
		handleReset
	)

	return (
		<Table
			columns={columns}
			scroll={{x: 1500}}
			size='small'
			dataSource={ordersArr}
			pagination={{position: ['topCenter']}}
			loading={props.loading}
			rowKey='hash'
		/>
	)
}

export default AntDOrdersTable
