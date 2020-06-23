import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchServicesThunk} from '../store/services'
import {addOrderServiceThunk} from '../store/singleorder'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'

class AddOrderServices extends Component {
	constructor(props) {
		super(props)
		this.handleAddService = this.handleAddService.bind(this)
	}

	componentDidMount() {
		this.props.getServices()
	}

	handleAddService(evt) {
		evt.preventDefault()
		let obj = {service: evt.target.name}
		let id = this.props.orderid
		this.props.addService(id, obj)
	}

	render() {
		const servicesDropDown = this.props.services || []
		return (
			<DropdownButton
				size='lg'
				id='dropdown-basic-button'
				title='Add Services'>
				{servicesDropDown.map(svc => (
					<Dropdown.Item
						key={svc.id}
						id={svc.id}
						name={svc.name}
						onClick={evt => this.handleAddService(evt)}>
						{svc.name}
					</Dropdown.Item>
				))}
			</DropdownButton>
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
		getServices: () => dispatch(fetchServicesThunk()),
		addService: (id, obj) => dispatch(addOrderServiceThunk(id, obj)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrderServices)
