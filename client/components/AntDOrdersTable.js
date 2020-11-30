import React, {useState, useEffect, useRef} from 'react'
import {Table, Input, Button, Space} from 'antd'
import Highlighter from 'react-highlight-words'
import {SearchOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Joe Black',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Jim Green',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
]

const AntDOrdersTable = () => {
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	let searchInput = useRef(null)

	const ordersArr = useSelector(state => state.archivedOrders)

	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => {
			return (
				<div style={{padding: 8}}>
					<Input
						ref={searchInput}
						placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={e =>
							setSelectedKeys(
								e.target.value ? [e.target.value] : []
							)
						}
						onPressEnter={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						style={{width: 188, marginBottom: 8, display: 'block'}}
					/>
					<Space>
						<Button
							type='primary'
							onClick={() =>
								handleSearch(selectedKeys, confirm, dataIndex)
							}
							icon={<SearchOutlined />}
							size='small'
							style={{width: 90}}>
							Search
						</Button>
						<Button
							onClick={() => handleReset(clearFilters)}
							size='small'
							style={{width: 90}}>
							Reset
						</Button>
					</Space>
				</div>
			)
		},
		filterIcon: filtered => (
			<SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				: '',
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.current.select(), 100)
			}
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	})

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = clearFilters => {
		clearFilters()
		setSearchText('')
	}

	const columns = [
		{
			title: 'status',
			dataIndex: 'status',
			key: 'name',
			width: '30%',
			...getColumnSearchProps('name'),
		},
		{
			title: 'carMake',
			dataIndex: 'carMake',
			key: 'age',
			width: '20%',
			...getColumnSearchProps('age'),
		},
		{
			title: 'pickupLocation',
			dataIndex: 'pickupLocation',
			key: 'address',
			...getColumnSearchProps('address'),
		},
	]

	return <Table columns={columns} dataSource={ordersArr} />
}

export default AntDOrdersTable
