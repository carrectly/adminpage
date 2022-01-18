import React from 'react'
import {Card, Button} from 'antd'
import UpdateDealer from './UpdateDealer'
import {DeleteFilled} from '@ant-design/icons'
import {removeDealerThunk} from '../../store/dealers.js'
import {useDispatch} from 'react-redux'

const DealerCard = props => {
	const dispatch = useDispatch()

	const handleClick = id => {
		dispatch(removeDealerThunk(id))
	}
	const dealer = props.dealer

	return (
		<Card
			hoverable
			className='dlrcard'
			style={{width: 200}}
			actions={[
				<UpdateDealer key='update' dealer={dealer} />,
				<Button
					style={{padding: '0px', width: '100%'}}
					key='delete'
					type='text'
					id={dealer.id}
					onClick={() => handleClick(dealer.id)}
					icon={
						<DeleteFilled style={{color: '#ff1212'}} />
					}></Button>,
			]}
			cover={
				<img
					src={
						dealer.imageUrl ||
						'https://www.autoserviceworld.com/wp-content/uploads/2020/01/team-labor-model-auto-repair-worker-png-and-vector-for-free-automotive-repair-png-650_400.png.jpeg'
					}
				/>
			}
			title={dealer.name}>
			<div className='emailSummary'>
				{dealer.email ? (
					<div>
						<div className='subheader'>Email:</div>
						<div>{dealer.email}</div>
					</div>
				) : (
					<div />
				)}

				{dealer.location ? (
					<div>
						<div className='subheader'>Location:</div>
						<div>{dealer.location}</div>
					</div>
				) : (
					<div />
				)}
				{dealer.phoneNumber ? (
					<div>
						<div className='subheader'>Phone Number:</div>
						<div>{dealer.phoneNumber}</div>
					</div>
				) : (
					<div />
				)}
				{dealer.specialty ? (
					<div>
						<div className='subheader'>Specialty:</div>
						<div>{dealer.specialty}</div>
					</div>
				) : (
					<div />
				)}
			</div>
		</Card>
	)
}

export default DealerCard
