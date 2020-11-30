import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllOrdersThunk} from '../store/archivedOrders'
import {Table} from 'react-bootstrap'
import AllOrdersTable from './AllOrdersTable'
import OrdersTableHeader from './OrdersTableHeader'
import {Pagination} from 'antd'
import FilterComponent from './FilterComponent'
import moment from 'moment'
import AntDOrdersTable from './AntDOrdersTable'

const AllOrders = () => {
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [ordersPerPage, setOrdersPerPage] = useState(25)
	const [date, setDate] = useState(null)
	const [name, setName] = useState(null)
	const [phoneNumber, setPhoneNumber] = useState(null)
	const [carMake, setCarMake] = useState(null)
	const [carModel, setCarModel] = useState(null)
	const [location, setLocation] = useState(null)
	const dispatch = useDispatch()
	const ordersArr = useSelector(state => state.archivedOrders)

	useEffect(() => {
		console.log('use effect')
		setLoading(true)
		dispatch(getAllOrdersThunk())
		setLoading(false)
	}, [])

	// Get current posts
	const indexOfLastPost = currentPage * ordersPerPage
	const indexOfFirstPost = indexOfLastPost - ordersPerPage
	let currentOrders = ordersArr.slice(indexOfFirstPost, indexOfLastPost)

	const filterByDate = evt => {
		setDate(evt.target.value)
	}
	const filterByName = evt => {
		if (evt.target.value.length > 2) {
			setName(evt.target.value)
		}
	}
	const filterByPhone = evt => {
		if (evt.target.value.length > 2) {
			setPhoneNumber(evt.target.value)
		}
	}
	const filterByCarMake = evt => {
		if (evt.target.value.length > 2) {
			setCarMake(evt.target.value)
		}
	}
	const filterByCarModel = evt => {
		if (evt.target.value.length > 2) {
			setCarModel(evt.target.value)
		}
	}

	const filterByLocation = evt => {
		if (evt.target.value.length > 2) {
			setLocation(evt.target.value)
		}
	}

	const applyFilter = () => {}

	return (
		<div>
			<div>
				<h1 className='center'>Orders View</h1>
			</div>
			<div className='center'>
				<Pagination
					size='small'
					defaultCurrent={1}
					defaultPageSize={20}
					current={currentPage}
					total={ordersArr.length}
					pageSize={ordersPerPage}
					onChange={(page, pageSize) => {
						setCurrentPage(page)
						setOrdersPerPage(pageSize)
					}}
					onShowSizeChange={(current, size) => {
						setCurrentPage(1)
						setOrdersPerPage(size)
					}}
				/>
			</div>
			<Table striped bordered hover size='sm' variant='dark'>
				<OrdersTableHeader />
				{/* <FilterComponent
					filterByDate={filterByDate}
					filterByName={filterByName}
					filterByPhone={filterByPhone}
					filterByCarMake={filterByCarMake}
					filterByCarModel={filterByCarModel}
					filterByLocation={filterByLocation}
				/> */}

				<AllOrdersTable orders={currentOrders} loading={loading} />
			</Table>
			<AntDOrdersTable />
		</div>
	)
}

export default AllOrders
