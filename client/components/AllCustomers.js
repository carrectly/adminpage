import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
	getContactsThunk,
	createContactThunk,
	getContactsByQueryThunk,
	clearContactsThunk,
} from '../store/contacts'
import {Table, Button, Form} from 'react-bootstrap'

class AllCustomers extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleSearchByEmail = this.handleSearchByEmail.bind(this)
		this.handleSearchByPhone = this.handleSearchByPhone.bind(this)

		this.state = {
			email: '',
			phone: '',
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		})
	}

	async handleSearchByEmail(evt) {
		evt.preventDefault()
		let obj = {}
		if (this.state.email) {
			obj.email = this.state.email
		}

		try {
			await this.props.queryContact(obj)
		} catch (err) {
			console.log(err)
		}
		this.setState({
			email: '',
			phone: '',
		})
		obj = {}
	}

	async handleSearchByPhone(evt) {
		evt.preventDefault()
		let obj = {}
		if (this.state.phone) {
			obj.phone = this.state.phone
		}
		try {
			await this.props.queryContact(obj)
		} catch (err) {
			console.log(err)
		}

		this.setState({
			email: '',
			phone: '',
		})

		obj = {}
	}

	componentWillUnmount() {
		this.props.clearContacts()
	}

	render() {
		console.log('state', this.state)
		const contacts = this.props.contacts || []
		return (
			<div>
				<div>
					<h1 className='center'>All Client Contacts</h1>
					<Form className='allcustomersform'>
						<span>
							<input
								type='text'
								name='email'
								placeholder='email'
								onChange={this.handleChange}
								value={this.state.email}
							/>
							<Button
								type='submit'
								onClick={evt => this.handleSearchByEmail(evt)}>
								Search by customer email
							</Button>
						</span>
						<span>
							<input
								type='text'
								name='phone'
								placeholder='phone'
								onChange={this.handleChange}
								value={this.state.phone}
							/>
							<Button
								type='submit'
								onClick={evt => this.handleSearchByPhone(evt)}>
								Search by customer phone number
							</Button>
						</span>
						<Button
							type='button'
							onClick={() => this.props.createContact()}>
							View All Customers
						</Button>
					</Form>
				</div>
				<div className='singleordertable'>
					<Table striped bordered hover size='sm' variant='dark'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone number</th>
								<th>View Order History</th>
							</tr>
						</thead>
						<tbody>
							{contacts.map((person, index) => (
								<tr key={index}>
									<td>
										{person.firstName} {person.lastName}
									</td>
									<td>{person.email}</td>
									<td>{person.phoneNumber}</td>
									<td>
										<Link
											to={`/singlecustomer/${person.phoneNumber}`}
											id={person.phoneNumber}>
											View History
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		contacts: state.contacts,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getContacts: () => dispatch(getContactsThunk()),
		createContact: () => dispatch(createContactThunk()),
		queryContact: obj => dispatch(getContactsByQueryThunk(obj)),
		clearContacts: () => dispatch(clearContactsThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllCustomers)
)
