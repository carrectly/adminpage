import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
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
			<div>
				<h1>Here you can manage all your shops and dealers</h1>
				<div>
					{dealers.map(dlr => (
						<div key={dlr.id}>
							<Link to={`/dealers/${dlr.id}`} key={dlr.id}>
								{dlr.name}
							</Link>
							<button
								id={dlr.id}
								type='button'
								onClick={id => this.handleClick(id)}>
								delete
							</button>
						</div>
					))}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dealers))
