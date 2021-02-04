import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
	fetchServicesThunk,
	addServiceThunk,
	updateServiceThunk,
} from '../../store/services'
import {Table, Button} from 'react-bootstrap'
import AddService from './AddService'
import UpdateService from './UpdateService'

class AllServices extends Component {
	async componentDidMount() {
		try {
			await this.props.fetchServices()
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const services = this.props.services
		return (
			<div>
				<h1 className='center'>
					Here you can manage all your services
				</h1>
				<AddService addService={this.props.addService} />
				<Table striped bordered hover size='sm' variant='dark'>
					<thead>
						<tr>
							<th>Service Name</th>
							<th>Standard Price</th>
							<th>Description</th>
							<th>Update Form</th>
						</tr>
					</thead>
					<tbody>
						{services.map(service => (
							<tr key={service.id}>
								<td>{service.name}</td>
								<td>{service.price}</td>
								<td>{service.description}</td>
								<td>
									<UpdateService
										service={service}
										updateService={this.props.updateService}
									/>
								</td>
							</tr>
						))}
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
