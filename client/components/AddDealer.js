import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addDealerThunk} from '../store/dealers.js'

class AddDealer extends Component {
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
		this.props.post(obj)
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
				<h1>Add a new dealer</h1>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='name'>Dealer Name:</label>
					<input
						name='name'
						type='text'
						onChange={this.handleChange}
						value={this.state.name}
					/>
					<br />

					<label htmlFor='email'>Email:</label>
					<input
						name='email'
						type='text'
						onChange={this.handleChange}
					/>

					<br />

					<label htmlFor='email'>Specialty:</label>
					<input
						name='specialty'
						type='text'
						onChange={this.handleChange}
					/>

					<br />
					<label htmlFor='location'>Location:</label>
					<input
						name='location'
						type='text'
						onChange={this.handleChange}
					/>

					<button type='submit' disabled={!this.state.name}>
						Submit
					</button>
				</form>
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
