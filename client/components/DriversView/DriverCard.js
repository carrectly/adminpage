import React from 'react'
import {Card, Button} from 'antd'
import UpdateDriver from './UpdateDriver'
import {DeleteFilled} from '@ant-design/icons'

const DriverCard = props => {
	const handleClick = evt => {
		console.log(evt)
		evt.preventDefault()
		if (evt.target.id) {
			props.delete(evt.target.id)
		}
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
					key='delete'
					type='text'
					id={driver.id}
					onClick={handleClick}>
					<DeleteFilled key='edit' style={{color: '#ff1212'}} />
				</Button>,
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
			</div>
		</Card>
	)
}

export default DriverCard
