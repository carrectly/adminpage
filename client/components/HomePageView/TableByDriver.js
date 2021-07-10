import React, {useEffect} from 'react'
import {Table} from 'antd'
import columns from '../Table/HomeTableForDriversColumns'
import {useSelector, useDispatch} from 'react-redux'
import {getUserOrdersThunk} from '../../store/userorders'

const TableByDriver = props => {
	const email = props.email
	const dispatch = useDispatch()
	const orders = useSelector(state => state.userorders)

	useEffect(() => {
		dispatch(getUserOrdersThunk(email))
	}, [])

	return (
		<Table
			scroll={{x: 'max-content'}}
			columns={columns}
			dataSource={orders}
			pagination={false}
			size='small'
			rowKey='hash'
		/>
	)
}

export default TableByDriver
