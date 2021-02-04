import React, {Component} from 'react'
import {useDispatch} from 'react-redux'
import {removeOrderServiceThunk} from '../../store/singleorder'
import {Table, Button} from 'react-bootstrap'
import AddOrderServices from './AddOrderServices'
import {useParams} from 'react-router-dom'
import UpdateOrderCharges from './UpdateOrderCharges'

const SingleOrderServices = props => {
	const services = props.services || []
	const params = useParams()
	const id = params.orderid
	const dispatch = useDispatch()

	const handleRemoveService = evt => {
		const obj = {serviceid: evt.target.id}
		dispatch(removeOrderServiceThunk(id, obj))
	}

	return (
		<Table striped bordered hover size='sm' variant='dark'>
			<thead>
				<tr>
					<th>
						<AddOrderServices orderid={id} />
					</th>
					<th>Customer Price</th>
					<th>Dealer Price</th>
					<th>Edit Pricing</th>
					<th>Remove from order</th>
				</tr>
			</thead>
			<tbody>
				{services.map(service => (
					<tr key={service.id} id={service.id}>
						<td
							style={{
								width: '30%',
								overflow: 'hidden',
							}}>
							{service.name}
						</td>
						<td>{service.orderdetails.customerPrice}</td>
						<td>{service.orderdetails.dealerPrice}</td>
						<td
							style={{
								width: '50px',
							}}>
							<UpdateOrderCharges service={service} />
						</td>
						<td
							style={{
								width: '50px',
							}}>
							<Button
								id={service.id}
								variant='danger'
								type='button'
								onClick={evt => handleRemoveService(evt)}>
								X
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default SingleOrderServices
