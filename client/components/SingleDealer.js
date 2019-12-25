import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchSingleDealerThunk} from '../store/singledealer'

class SingleDealer extends Component {
	componentDidMount() {
		try {
			const dealerid = this.props.match.params.dealerid
			console.log('dealer id ', dealerid)
			console.log('params', this.props.match.params)
			this.props.getDealer(dealerid)
		} catch (error) {
			console.error(error)
		}
	}

	render() {
		const dealer = this.props.dealer
		return dealer.id ? (
			<div className='allItems'>
				<div key={dealer.id} className='list'>
					{dealer.name}
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
