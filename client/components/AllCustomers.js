import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getContactsThunk, createContactThunk} from '../store/contacts'
import {Table} from 'react-bootstrap'

class AllCustomers extends Component {
	// componentDidMount() {
	// 	this.props.getContacts()
	// }

	render() {
		const contacts = this.props.contacts || []
		return (
			<div>
				<div>
					<h1>All Client Contacts</h1>
					<form onSubmit={this.handleSubmit}>
						<span>
							<input
								type='text'
								name='customername'
								placeholder='customer name'
							/>
							<button type='submit'>
								Search by customer name
							</button>
						</span>
						<span>
							<input
								type='text'
								name='email'
								placeholder='email'
							/>
							<button type='submit'>
								Search by customer email
							</button>
						</span>
						<span>
							<input
								type='text'
								name='phone'
								placeholder='phone'
							/>
							<button type='submit'>
								Search by customer phone number
							</button>
						</span>
						<button
							type='button'
							onClick={() => this.props.getContacts()}>
							View All Customers
						</button>
					</form>
				</div>
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
								<td>{person.names[0].displayName}</td>
								<td>{person.emailAddresses[0].value}</td>
								<td>{person.phoneNumbers[0].value}</td>
								<td>
									<Link
										to={`/singlecustomer/${person.phoneNumbers[0].value}`}
										id={person.phoneNumbers[0].value}>
										View History
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
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
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllCustomers)
)
