import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'react-bootstrap'

class AddService extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			name: '',
			price: '',
			description: '',
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		})
	}
	handleSubmit(evt) {
		evt.preventDefault()
		let obj = {}
		if (this.state.name) {
			obj.name = this.state.name
		}
		if (this.state.price) {
			obj.price = this.state.price
		}
		if (this.state.description) {
			obj.description = this.state.description
		}
		this.props.addService(obj)
		obj = {}

		this.setState({
			name: '',
			price: '',
			description: '',
		})
	}

	render() {
		return (
			<tr>
				<td>
					<input
						className='priceupdateform2'
						name='name'
						type='text'
						placeholder='name'
						value={this.state.name}
						onChange={this.handleChange}
					/>
				</td>
				<td>
					<input
						className='priceupdateform'
						name='price'
						type='number'
						placeholder='price'
						value={this.state.price}
						onChange={this.handleChange}
					/>
				</td>
				<td>
					<input
						className='priceupdateform2'
						name='description'
						type='text'
						placeholder='description'
						value={this.state.description}
						onChange={this.handleChange}
					/>
				</td>
				<td colSpan='3'>
					<Button type='button' onClick={id => this.handleSubmit(id)}>
						Add New Service
					</Button>
				</td>
			</tr>
		)
	}
}

export default connect(null, null)(AddService)
