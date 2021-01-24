import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchServicesThunk} from '../store/services'
import {addOrderServiceThunk} from '../store/singleorder'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'
import {Select} from 'antd'

const {Option} = Select

class AddOrderServices extends Component {
	constructor(props) {
		super(props)
		this.handleAddService = this.handleAddService.bind(this)
	}

	componentDidMount() {
		this.props.getServices()
	}

	handleAddService(value) {
		let obj = {service: value}
		let id = this.props.orderid
		this.props.addService(id, obj)
	}

	render() {
		const servicesDropDown = this.props.services || []
		return (
			<Select
				showSearch
				style={{width: 200}}
				placeholder='Search to add service'
				optionFilterProp='children'
				onChange={this.handleAddService}
				filterOption={(input, option) =>
					option.children
						.toLowerCase()
						.indexOf(input.toLowerCase()) >= 0
				}
				filterSort={(optionA, optionB) =>
					optionA.children
						.toLowerCase()
						.localeCompare(optionB.children.toLowerCase())
				}>
				{servicesDropDown.map(svc => (
					<Option
						value={svc.name}
						key={svc.id}
						name={svc.name}
						id={svc.id}>
						{svc.name}
					</Option>
				))}
			</Select>
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
