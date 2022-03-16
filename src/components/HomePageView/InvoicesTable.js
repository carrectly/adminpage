import React, {useState, useRef} from 'react'
import {Table} from 'antd'
import InvoiceColumns from '../Table/InvoicesTableColumns'

const InvoicesTable = props => {
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	let searchInput = useRef(null)

	const array = props.ordersArray || []

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = clearFilters => {
		clearFilters()
		setSearchText('')
	}

	const columns = InvoiceColumns(
		searchInput,
		searchText,
		searchedColumn,
		handleSearch,
		handleReset
	)

	return (
		<Table
			columns={columns}
			scroll={{x: 'max-content'}}
			size='small'
			dataSource={array}
			pagination={{position: ['bottomCenter']}}
			loading={props.loading}
			rowKey='hash'
		/>
	)
}

export default InvoicesTable
