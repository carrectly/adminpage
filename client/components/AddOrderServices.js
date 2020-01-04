import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchServicesThunk} from '../store/services'
import {addOrderServiceThunk} from '../store/singleorder'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'

class AddOrderServices extends Component {
	constructor(props) {
		super(props)
		this.handleAddService = this.handleAddService.bind(this)
		//this.handleDropDownChange = this.handleDropDownChange.bind(this)
		// this.state = {
		// 	service: '',
		// }
	}

	componentDidMount() {
		this.props.getServices()
	}

	// handleDropDownChange(evt) {
	// 	this.setState({service: evt.target.value})
	// }

	handleAddService(evt) {
		evt.preventDefault()
		console.log('event', event.target)
		let obj = {service: evt.target.name}
		let id = this.props.orderid
		this.props.addService(id, obj)
		//this.setState({})
	}

	render() {
		const servicesDropDown = this.props.services || []
		console.log('state', this.state)
		return (
			<td colSpan='6'>
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
			</td>
			// <form onSubmit={evt => this.handleAddService(evt)}>
			// 	<select
			// 		name='serviceDropDown'
			// 		onChange={this.handleDropDownChange}>
			// 		{servicesDropDown.map(el => (
			// 			<option key={el.id} value={el.name} name={el.name}>
			// 				{el.name}
			// 			</option>
			// 		))}
			// 	</select>
			// 	<button type='submit'>Add additional service</button>
			// </form>
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
