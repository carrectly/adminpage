import React from 'react'
import {Card, Button} from 'antd'
import UpdateDealer from './UpdateDealer'
import {DeleteFilled} from '@ant-design/icons'

const DealerCard = props => {
	const handleClick = evt => {
		console.log(evt)
		evt.preventDefault()
		if (evt.target.id) {
			props.delete(evt.target.id)
		}
	}
	const dealer = props.dealer

	return (
		<Card
			hoverable
			className='dlrcard'
			style={{width: 300}}
			actions={[
				<UpdateDealer key='update' dealer={dealer} />,
				<Button
					key='delete'
					type='text'
					id={dealer.id}
					onClick={handleClick}>
					<DeleteFilled key='edit' />
				</Button>,
			]}
			cover={
				<img
					alt={dealer.name}
					src='https://www.autoserviceworld.com/wp-content/uploads/2020/01/team-labor-model-auto-repair-worker-png-and-vector-for-free-automotive-repair-png-650_400.png.jpeg'
				/>
			}
			title={dealer.name}>
			<div>{dealer.email}</div>
			<div>{dealer.location}</div>
		</Card>
	)
}

export default DealerCard
