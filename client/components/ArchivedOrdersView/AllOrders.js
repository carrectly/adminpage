import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllOrdersThunk} from '../../store/archivedOrders'
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
