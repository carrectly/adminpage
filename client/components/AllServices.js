import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
	fetchServicesThunk,
	addServiceThunk,
	updateServiceThunk,
} from '../store/services'
import {Table} from 'react-bootstrap'
import AddService from './AddService'
import UpdateService from './UpdateService'

class AllServices extends Component {
	async componentDidMount() {
		await this.props.fetchServices()
	}

	render() {
		const services = this.props.services
		return (
			<div>
				<h1 className='center'>
					Here you can manage all your services
				</h1>
				<Table striped bordered hover size='sm' variant='dark'>
					<thead>
						<tr>
							<th>Service Name</th>
							<th>Service Standard Price</th>
							<th>Service Description</th>
							<th>Update Form</th>
						</tr>
					</thead>
					<tbody>
						{services.map(service => (
							<tr key={service.id}>
								<td>{service.name}</td>
								<td>{service.price}</td>
								<td>{service.description}</td>
								<UpdateService
									service={service}
									updateService={this.props.updateService}
								/>
							</tr>
						))}
						<AddService addService={this.props.addService} />
					</tbody>
				</Table>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		services: state.services,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchServices: () => dispatch(fetchServicesThunk()),
		addService: obj => dispatch(addServiceThunk(obj)),
		updateService: (id, obj) => dispatch(updateServiceThunk(id, obj)),
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllServices)
)
