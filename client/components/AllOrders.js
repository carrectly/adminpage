import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllOrdersThunk} from '../store/archivedOrders'
import {Table} from 'react-bootstrap'
import AllOrdersTable from './AllOrdersTable'
import OrdersTableHeader from './OrdersTableHeader'
import {Pagination} from 'antd'
import FilterComponent from './FilterComponent'

const AllOrders = () => {
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [ordersPerPage, setOrdersPerPage] = useState(25)
	const dispatch = useDispatch()
	const ordersArr = useSelector(state => state.archivedOrders)

	useEffect(() => {
		setLoading(true)
		dispatch(getAllOrdersThunk())
		setLoading(false)
	}, [])

	// Get current posts
	const indexOfLastPost = currentPage * ordersPerPage
	const indexOfFirstPost = indexOfLastPost - ordersPerPage
	const currentOrders = ordersArr.slice(indexOfFirstPost, indexOfLastPost)

	return (
		<div>
			<div>
				<h1 className='center'>Orders View</h1>
			</div>
			<Pagination
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
				responsive={true}
			/>
			<Table striped bordered hover size='sm' variant='dark'>
				<OrdersTableHeader />
				<FilterComponent />
				<AllOrdersTable orders={currentOrders} loading={loading} />
			</Table>
		</div>
	)
}

export default AllOrders
