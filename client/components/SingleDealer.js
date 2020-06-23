import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchSingleDealerThunk} from '../store/singledealer'
import UpdateDealer from './UpdateDealer'

class SingleDealer extends Component {
	componentDidMount() {
		try {
			const dealerid = this.props.match.params.dealerid
			this.props.getDealer(dealerid)
		} catch (error) {
			console.error(error)
		}
	}

	render() {
		const dealer = this.props.dealer
		return dealer.id ? (
			<div>
				<div className='singledealerview'>
					<div className='singledealerinfo'>
						<h3>Dealer Info</h3>
						<div>Name: {dealer.name}</div>
						<div>Email: {dealer.email}</div>
						<div>Specialty: {dealer.specialty}</div>
						<div>Phone: {dealer.specialty}</div>
						<div>Location: {dealer.location}</div>
					</div>
					<div className='adddealersform'>
						<UpdateDealer id={this.props.match.params.dealerid} />
					</div>
				</div>
			</div>
		) : (
			<div />
		)
	}
}

const mapStateToProps = state => {
	return {
		dealer: state.singledealer,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getDealer: id => dispatch(fetchSingleDealerThunk(id)),
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleDealer)
)
