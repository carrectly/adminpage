import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchServicesThunk} from '../../store/services'
import {Table} from 'antd'
import AddService from './AddService'
import UpdateService from './UpdateService'

const columns = [
	{
		title: 'Service Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Standard Price',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Update Form',
		dataIndex: 'name',
		key: 'updateservice',
		render: (value, row) => <UpdateService value={value} row={row} />,
	},
]

const AllServices = () => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

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
