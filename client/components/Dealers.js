import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddDealer from './AddDealer.js'
import {removeDealerThunk, fetchDealersThunk} from '../store/dealers.js'

class Dealers extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	async componentDidMount() {
		await this.props.fetchDealers()
	}

	handleClick = evt => {
		evt.preventDefault()
		if (evt.target.id) {
			this.props.remove(evt.target.id)
		}
	}

	render() {
		const dealers = this.props.dealers
		return dealers.length ? (
			<div className='allItems'>
				<div className='list'>
					<ul className='redx'>
						{dealers.map(bot => (
							<div key={bot.id}>
								<Link to={`/dealers/${bot.id}`} key={bot.id}>
									{bot.name}
									<span>{bot.name}</span>
								</Link>
								<button
									id={bot.id}
									type='button'
									onClick={id => this.handleClick(id)}>
									delete
								</button>
							</div>
						))}
					</ul>
					<div />
				</div>
				<AddDealer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dealers)
