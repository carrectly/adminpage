import React, {useState, useEffect, useRef} from 'react'
import {Table, Input, Button, Space} from 'antd'
import Highlighter from 'react-highlight-words'
import {SearchOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const AntDCustomersTable = props => {
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	let searchInput = useRef(null)

	const customersArray = useSelector(state => state.contacts)

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
			title: 'First Name',
			dataIndex: 'firstName',
			key: 'firstName',
			width: '10%',
			...getColumnSearchProps('firstName'),
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
			width: '10%',
			...getColumnSearchProps('lastName'),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: '10%',
			...getColumnSearchProps('email'),
		},
		{
			title: 'Phone #',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			width: '10%',
			...getColumnSearchProps('phoneNumber'),
		},
		{
			title: 'Customer Info',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			width: '10%',
			render: value => (
				<Link to={`/singlecustomer/${value}`}>Customer Info</Link>
			),
		},
	]

	return (
		<Table
			columns={columns}
			dataSource={customersArray}
			pagination={{position: ['topCenter']}}
			loading={props.loading}
		/>
	)
}

export default AntDCustomersTable
