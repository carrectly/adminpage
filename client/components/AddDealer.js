import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addDealerThunk} from '../store/dealers.js'
import {Form, Button} from 'react-bootstrap'

class AddDealer extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			name: '',
			email: '',
			phoneNumber: '',
			specialty: '',
			location: '',
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
		if (this.state.email) {
			obj.email = this.state.email
		}
		if (this.state.specialty) {
			obj.specialty = this.state.specialty
		}
		if (this.state.phoneNumber) {
			obj.phoneNumber = this.state.phoneNumber
		}
		if (this.state.location) {
			obj.location = this.state.location
		}
		this.props.post(obj)
		obj = {}
		this.setState({
			name: '',
			email: '',
			phoneNumber: '',
			specialty: '',
			location: '',
		})
	}

	render() {
		return (
			<div className='form'>
				<h5>Add a new dealer</h5>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId='formBasicName'>
						<Form.Control
							type='text'
							name='name'
							value={this.state.name}
							placeholder='Service Shop Name'
							onChange={this.handleChange}
						/>
						<Form.Text className='text-muted'>*required</Form.Text>
					</Form.Group>

					<Form.Group controlId='formBasicEmail'>
						<Form.Control
							type='email'
							name='email'
							value={this.state.email}
							placeholder='Email'
							onChange={this.handleChange}
						/>
						<Form.Text className='text-muted'>*required</Form.Text>
					</Form.Group>

					<Form.Group controlId='formBasicPhoneNumber'>
						<Form.Control
							type='phoneNumber'
							name='phoneNumber'
							value={this.state.phoneNumber}
							placeholder='Phone Number'
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicSpecialty'>
						<Form.Control
							type='text'
							name='specialty'
							value={this.state.specialty}
							placeholder='Specialty'
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						<Form.Control
							type='text'
							name='location'
							value={this.state.location}
							placeholder='business location'
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Button
						variant='primary'
						type='submit'
						disabled={!this.state.name}>
						Submit
					</Button>
				</Form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		post: obj => dispatch(addDealerThunk(obj)),
	}
}
export default connect(null, mapDispatchToProps)(AddDealer)
