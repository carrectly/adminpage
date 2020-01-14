import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddDealer from './AddDealer.js'
import {removeDealerThunk, fetchDealersThunk} from '../store/dealers.js'
import DealerCard from './DealerCard'

class Dealers extends Component {
	async componentDidMount() {
		await this.props.fetchDealers()
	}

	render() {
		const dealers = this.props.dealers
		return dealers.length ? (
			<div>
				<h1 className='center'>
					Here you can manage all your shops and dealers
				</h1>
				<div className='alldealersview'>
					<div className='dealerscontainer'>
						{dealers.map(dlr => (
							<DealerCard
								dealer={dlr}
								delete={this.props.remove}
								key={dlr.id}
							/>
						))}
					</div>
					<div className='adddealersform'>
						<AddDealer />
					</div>
				</div>
			</div>
		) : (
			<div>
				<h1>No dealers Found</h1>
				<AddDealer />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		dealers: state.dealers,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		remove: id => dispatch(removeDealerThunk(id)),
		fetchDealers: () => dispatch(fetchDealersThunk()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dealers))
