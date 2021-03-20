import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchServicesThunk} from '../../store/services'
import {addOrderServiceThunk} from '../../store/singleorder'
import {Select, Button} from 'antd'

const {Option} = Select

class AddOrderServices extends Component {
	constructor(props) {
		super(props)
		this.handleAddService = this.handleAddService.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.state = {service: null}
	}

	componentDidMount() {
		this.props.getServices()
	}

	handleAddService() {
		let id = this.props.orderid
		this.props.addService(id, this.state)
		this.setState({service: null})
	}

	handleChange(value) {
		this.setState({
			service: value,
		})
	}

	render() {
		const servicesDropDown = this.props.services || []
		return (
			<div className='select-and-button'>
				<Select
					showSearch
					style={{width: '80%'}}
					placeholder='Search to add service'
					optionFilterProp='children'
					onChange={this.handleChange}
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
				<Button
					style={{backgroundColor: '#6AEB6F'}}
					size='middle'
					shape='round'
					disabled={!this.state.service}
					onClick={this.handleAddService}>
					Add
				</Button>
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
		getServices: () => dispatch(fetchServicesThunk()),
		addService: (id, obj) => dispatch(addOrderServiceThunk(id, obj)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrderServices)
