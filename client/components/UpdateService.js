import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'react-bootstrap'

class UpdateService extends Component {
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
		this.props.updateService(evt.target.id, obj)
		obj = {}

		this.setState({
			name: '',
			price: '',
			description: '',
		})
	}

	render() {
		const service = this.props.service
		return (
			<td>
				<table>
					<tbody>
						<tr>
							<td>
								<input
									className='priceupdateform'
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
									type='text'
									placeholder='price'
									value={this.state.price}
									onChange={this.handleChange}
								/>
							</td>
							<td>
								<input
									className='priceupdateform'
									name='description'
									type='text'
									placeholder='description'
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</td>
							<td>
								<Button
									id={service.id}
									type='button'
									onClick={evt => this.handleSubmit(evt)}>
									Update Service
								</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		)
	}
}

export default connect(null, null)(UpdateService)
