import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchServicesThunk} from '../../store/services'
import {Table} from 'antd'
import AddService from './AddService'
import ServicesColumns from '../Table/ServicesColumns'

const AllServices = () => {
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const [loading, setLoading] = useState(false)
	let searchInput = useRef(null)
	const dispatch = useDispatch()

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = clearFilters => {
		clearFilters()
		setSearchText('')
	}

	const columns = ServicesColumns(
		searchInput,
		searchText,
		searchedColumn,
		handleSearch,
		handleReset
	)
	const services = useSelector(state => state.services)

	useEffect(() => {
		setLoading(true)
		dispatch(fetchServicesThunk())
		setLoading(false)
	}, [])

	return (
		<div>
			<AddService />
			<Table
				columns={columns}
				dataSource={services}
				pagination={false}
				size='small'
				loading={loading}
			/>
		</div>
	)
}

export default AllServices
