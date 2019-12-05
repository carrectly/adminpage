import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getContactsThunk} from '../store/contacts'

class AllUsers extends Component {
	render() {
		const contacts = this.props.contacts || []
		return (
			<div>
				<div>
					<h1>Contacts coming soon</h1>
					<button
						type='button'
						onClick={() => this.props.getContacts()}>
						View All Users
					</button>
				</div>
				<div>
					{contacts.map(person => (
						<li key={person.etag}>{person.names[0].displayName}</li>
					))}
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
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllUsers)
)
