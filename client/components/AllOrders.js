import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllOrdersThunk} from '../store/archivedOrders'
import {Table} from 'react-bootstrap'
import OrdersTableHeader from './OrdersTableHeader'
import {Pagination} from 'antd'
import FilterComponent from './FilterComponent'
import moment from 'moment'
import AntDOrdersTable from './AntDOrdersTable'

const AllOrders = () => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		setLoading(true)
		dispatch(getAllOrdersThunk())
		setLoading(false)
	}, [])

	return (
		<div>
			<AntDOrdersTable loading={loading} />
		</div>
	)
}

export default AllOrders
