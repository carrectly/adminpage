import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Card, Button} from 'antd'
import UpdateDealer from './UpdateDealer'

class DealerCard extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick = evt => {
		evt.preventDefault()
		if (evt.target.id) {
			this.props.delete(evt.target.id)
		}
	}
	render() {
		const dealer = this.props.dealer
		return (
			<Card className='dlrcard' title={dealer.name}>
				<div>{dealer.email}</div>
				<div>{dealer.location}</div>
				<UpdateDealer dealer={dealer} />
				<Button
					id={dealer.id}
					onClick={this.handleClick}
					type='primary'
					danger>
					Delete
				</Button>
			</Card>
		)
	}
}

export default withRouter(connect(null, null)(DealerCard))
