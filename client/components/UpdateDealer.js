import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateDealerThunk, fetchSingleDealerThunk} from '../store/singledealer'
import {Form, Button} from 'react-bootstrap'

class UpdateDealer extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			name: '',
			email: '',
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
		if (this.state.location) {
			obj.location = this.state.location
		}
		let id = this.props.id
		console.log('inside update form', id)
		this.props.update(id, obj)
		obj = {}
		this.setState({
			name: '',
			email: '',
			specialty: '',
			location: '',
		})
	}

	render() {
		return (
			<div className='form'>
				<h1>Update service shop info</h1>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId='formBasicName'>
						<Form.Label>Service Shop Name</Form.Label>
						<Form.Control
							type='text'
							name='name'
							value={this.state.name}
							placeholder='Enter name'
							onChange={this.handleChange}
						/>
						<Form.Text className='text-muted'>*required</Form.Text>
					</Form.Group>

					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							name='email'
							value={this.state.email}
							placeholder='Email'
							onChange={this.handleChange}
						/>
						<Form.Text className='text-muted'>*required</Form.Text>
					</Form.Group>

					<Form.Group controlId='formBasicSpecialty'>
						<Form.Label>Specialty</Form.Label>
						<Form.Control
							type='text'
							name='specialty'
							value={this.state.specialty}
							placeholder='bodywork, mechanics, etc...'
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						<Form.Label>Location</Form.Label>
						<Form.Control
							type='text'
							name='location'
							value={this.state.location}
							placeholder='business adrress'
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
		update: (id, obj) => dispatch(updateDealerThunk(id, obj)),
		getDealer: id => dispatch(fetchSingleDealerThunk(id)),
	}
}
export default connect(null, mapDispatchToProps)(UpdateDealer)
