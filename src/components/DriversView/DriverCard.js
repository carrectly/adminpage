import React from 'react'
import {Card, Button, Tag} from 'antd'
import UpdateDriver from './UpdateDriver'
import {DeleteFilled} from '@ant-design/icons'
import {removeDriverThunk} from '../../store/drivers.js'
import {useDispatch} from 'react-redux'

const DriverCard = props => {
	const dispatch = useDispatch()

	const handleClick = id => {
		dispatch(removeDriverThunk(id))
	}

	const driver = props.driver

	return (
		<Card
			hoverable
			className='dlrcard'
			style={{width: 200}}
			actions={[
				<UpdateDriver key='update' driver={driver} />,
				<Button
					style={{padding: '0px', width: '100%'}}
					onClick={() => handleClick(driver.id)}
					key='delete'
					type='text'
					id={driver.id}
					icon={
						<DeleteFilled style={{color: '#ff1212'}} />
					}></Button>,
			]}
			cover={
				<img
					src={
						driver.imageUrl ||
						'https://play-lh.googleusercontent.com/Q8RMXj6aSFQolfCuivGnXqF1ELD31HIuEFifG8MiDeHPjpFh9umrIkKL1VEvHnT_Ww'
					}
				/>
			}
			title={driver.name}>
			<div className='emailSummary'>
				{driver.email ? (
					<div>
						<div className='subheader'>Email:</div>
						<div>{driver.email}</div>
					</div>
				) : (
					<div />
				)}

				{driver.phoneNumber ? (
					<div>
						<div className='subheader'>Phone Number:</div>
						<div>{driver.phoneNumber}</div>
					</div>
				) : (
					<div />
				)}
				{driver.tagColor ? (
					<div>
						<div className='subheader'>Tag Color:</div>
						<div>
							<Tag color={driver.tagColor}>{driver.name}</Tag>
						</div>
					</div>
				) : (
					<div />
				)}
			</div>
		</Card>
	)
}

export default DriverCard
