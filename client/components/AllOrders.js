import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector, connect} from 'react-redux'
import {getAllOrdersThunk} from '../store/archivedOrders'
import {Table} from 'react-bootstrap'
import AllOrdersTable from './AllOrdersTable'
import OrdersTableHeader from './OrdersTableHeader'
import Pagination from './Pagination'
import {withRouter} from 'react-router-dom'

const AllOrders = () => {
	//const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [ordersPerPage] = useState(25)
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

	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber)

	return (
		<div>
			<div>
				<h1 className='center'>Orders View</h1>
			</div>
			<Pagination
				postsPerPage={ordersPerPage}
				totalPosts={ordersArr.length}
				paginate={paginate}
			/>
			<Table striped bordered hover size='sm' variant='dark'>
				<OrdersTableHeader />
				<AllOrdersTable orders={currentOrders} loading={loading} />
			</Table>
		</div>
	)
}

// const mapStateToProps = state => {
// 	return {
// 		orders: state.archivedOrders,
// 	}
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		getOrders: () => dispatch(getAllOrdersThunk()),
// 		fetchCustom: obj => dispatch(fetchCustomDataThunk(obj)),
// 	}
// }
//export default withRouter(connect()(AllOrders))

export default AllOrders
