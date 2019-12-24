import React, {Component} from 'react'
import {connect} from 'react-redux'

class InvoiceForm extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			service: '',
			price: '',
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
		if (this.state.service) {
			obj.service = this.state.service
		}
		if (this.state.price) {
			obj.price = this.state.price
		}
		//this.props.post(obj)
		obj = {}
		this.setState({
			service: '',
			price: '',
		})
	}

	render() {
		return (
			<div className='form'>
				<h1>Create Invoice</h1>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='service'>Service Name:</label>
					<input
						name='service'
						type='text'
						onChange={this.handleChange}
					/>

					<br />
					<label htmlFor='price'>Price:</label>
					<input
						name='price'
						type='number'
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

// const mapDispatchToProps = dispatch => {
// 	return {
// 		post: obj => dispatch(addDealerThunk(obj)),
// 	}
// }
export default connect(null, null)(InvoiceForm)
