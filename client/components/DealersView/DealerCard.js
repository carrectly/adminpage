import React from 'react'
import {Card, Button} from 'antd'
import UpdateDealer from './UpdateDealer'

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
		<Card className='dlrcard' title={dealer.name}>
			<div>{dealer.email}</div>
			<div>{dealer.location}</div>
			<UpdateDealer dealer={dealer} />
			<Button id={dealer.id} onClick={handleClick} type='primary' danger>
				Delete
			</Button>
		</Card>
	)
}

export default DealerCard
