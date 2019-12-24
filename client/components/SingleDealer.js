import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingledealer} from '../store/singledealer'
import Updatedealer from './Updatedealer.js'

class Singledealer extends Component {
	componentDidMount() {
		try {
			const dealerId = this.props.match.params.dealerId
			this.props.fetchSingledealer(dealerId)
		} catch (error) {
			console.error(error)
		}
	}

	handleClick = evt => {
		const dealerId = this.props.dealer.id
		const projectId = evt.target.id
		this.props.unassignProject(dealerId, projectId)
	}

	render() {
		const dealer = this.props.dealer
		return dealer.id ? (
			<div className='allItems'>
				<div key={dealer.id} className='list'>
					<ul>
						<img src={dealer.imageUrl} height='300' width='400' />
						<li>{dealer.name}</li>
						<li>{dealer.fuelType}</li>
						<li>{dealer.fuelLevel}</li>
						{dealer.projects[0] ? (
							<ul className='associations'>
								{dealer.projects.map(proj => (
									<li key={proj.id}>
										<Link to={`/projects/${proj.id}`}>
											<span>{proj.title}</span>
										</Link>
										<span>
											<button
												type='button'
												id={proj.id}
												onClick={evt => {
													this.handleClick(evt)
												}}>
												Unassign
											</button>
										</span>
									</li>
								))}
							</ul>
						) : (
							<li>No projects for this dealer</li>
						)}
					</ul>
				</div>
				<div className='form'>
					<Updatedealer
						params={this.props.match.params}
						fetchSingledealer={this.props.fetchSingledealer}
					/>
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
		fetchSingledealer: id => dispatch(fetchSingledealer(id)),
		unassignProject: (dealerId, projectId) =>
			dispatch(unassignProjectThunk(dealerId, projectId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Singledealer)
