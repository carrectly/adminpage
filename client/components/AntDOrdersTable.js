import React, {useState, useEffect, useRef} from 'react'
import {Table, Input, Button, Space} from 'antd'
import Highlighter from 'react-highlight-words'
import {SearchOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {
	DateCell,
	CustomerInfoCell,
	OrderDetailsCell,
	DeleteOrderCell,
} from './util'

const AntDOrdersTable = props => {
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
			title: 'Order Link',
			dataIndex: 'hash',
			key: 'hash',
			width: '10%',
			render: value => <OrderDetailsCell value={value} />,
		},
		{
			title: 'Customer Info',
			dataIndex: 'customerPhoneNumber',
			key: 'customerPhoneNumber',
			width: '10%',
			render: value => <CustomerInfoCell value={value} />,
		},
		{
			title: 'status',
			dataIndex: 'status',
			key: 'name',
			width: '10%',
			...getColumnSearchProps('status'),
		},
		{
			title: 'carMake',
			dataIndex: 'carMake',
			key: 'age',
			width: '10%',
			...getColumnSearchProps('carMake'),
		},
		{
			title: 'carModel',
			dataIndex: 'carModel',
			key: 'carModel',
			width: '10%',
			...getColumnSearchProps('carModel'),
		},
		{
			title: 'Customer Phone #',
			dataIndex: 'customerPhoneNumber',
			key: 'customerPhoneNumber',
			width: '20%',
			...getColumnSearchProps('customerPhoneNumber'),
		},
		{
			title: 'pickupLocation',
			dataIndex: 'pickupLocation',
			key: 'pickupLocation',
			...getColumnSearchProps('pickupLocation'),
		},
		{
			title: 'pickupDate',
			dataIndex: 'pickupDate',
			key: 'pickupDate',
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

	return (
		<Table
			columns={columns}
			dataSource={ordersArr}
			pagination={{position: ['topCenter']}}
			loading={props.loading}
		/>
	)
}

export default AntDOrdersTable
