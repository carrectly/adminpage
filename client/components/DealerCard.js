import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import UpdateDealer from './UpdateDealer'

class DealerCard extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick = evt => {
		console.log('card event', evt)
		evt.preventDefault()
		if (evt.target.id) {
			this.props.delete(evt.target.id)
		}
	}
	render() {
		const dealer = this.props.dealer
		return (
			<Card className='dlrcard'>
				<Card.Body>
					<Card.Title>{dealer.name}</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						<div>{dealer.email}</div>
						<div>{dealer.location}</div>
					</Card.Subtitle>
					<UpdateDealer dealer={dealer} />
					<Button
						id={dealer.id}
						onClick={this.handleClick}
						variant='danger'>
						Delete
					</Button>
				</Card.Body>
			</Card>
		)
	}
}

export default withRouter(connect(null, null)(DealerCard))
