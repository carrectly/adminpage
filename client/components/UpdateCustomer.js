import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSingleCustomerThunk} from '../store/singlecustomer'
import {Form, Button} from 'react-bootstrap'

class UpdateCustomer extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			location: '',
			firstName: '',
			lastName: '',
			email: '',
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
		if (this.state.location) {
			obj.location = this.state.location
		}
		if (this.state.email) {
			obj.email = this.state.email
		}
		if (this.state.firstName) {
			obj.firstName = this.state.firstName
		}
		if (this.state.lastName) {
			obj.lastName = this.state.lastName
		}
		let phone = this.props.phone
		console.log('inside update form', phone)
		this.props.update(phone, obj)
		obj = {}
		this.setState({
			location: '',
			firstName: '',
			lastName: '',
			email: '',
		})
	}

	render() {
		return (
			<div className='form'>
				<h3>Update Customer info</h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId='formBasicName'>
						{/* <Form.Label>Location</Form.Label> */}
						<Form.Control
							type='text'
							name='location'
							value={this.state.location}
							placeholder='Location'
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicEmail'>
						{/* <Form.Label>First Name</Form.Label> */}
						<Form.Control
							type='text'
							name='firstName'
							placeholder='First Name'
							value={this.state.firstName}
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicSpecialty'>
						{/* <Form.Label>Last Name</Form.Label> */}
						<Form.Control
							type='text'
							name='lastName'
							placeholder='Last Name'
							value={this.state.lastName}
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						{/* <Form.Label>Email</Form.Label> */}
						<Form.Control
							type='email'
							name='email'
							value={this.state.email}
							placeholder='Email'
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Button variant='primary' type='submit'>
						Update
					</Button>
				</Form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		update: (id, obj) => dispatch(updateSingleCustomerThunk(id, obj)),
	}
}
export default connect(null, mapDispatchToProps)(UpdateCustomer)
