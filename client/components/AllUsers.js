import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getContactsThunk, createContactThunk} from '../store/contacts'
import {getUserOrdersThunk} from '../store/userorders'
import {Table} from 'react-bootstrap'

class AllUsers extends Component {
	render() {
		const contacts = this.props.contacts || []
		return (
			<div>
				<div>
					<h1>All Client Contacts</h1>
					<button
						type='button'
						onClick={() => this.props.getContacts()}>
						View All Clients
					</button>
					<button
						type='button'
						onClick={() => this.props.createContact()}>
						Create new Contact
					</button>
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
										to={`/singleuser/${person.phoneNumbers[0].value}`}
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
	connect(mapStateToProps, mapDispatchToProps)(AllUsers)
)
