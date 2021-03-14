import React from 'react'
import {Table} from 'antd'
import AddOrderServices from './AddOrderServices'
import {useParams} from 'react-router-dom'
import columns from '../Table/SingleOrderServicesColumns'

const SingleOrderServices = props => {
	const services = props.services || []
	const params = useParams()
	const id = params.orderid

	return (
		<div>
			<AddOrderServices orderid={id} />
			<Table
				columns={columns}
				dataSource={services}
				pagination={false}
				size='small'
				rowKey='id'
			/>
		</div>
	)
}

export default SingleOrderServices
