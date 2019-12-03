import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEmailsThunk} from '../store/emails'

class Gmail extends Component {
	render() {
		const emails = this.props.emails || []
		return (
			<div>
				<div>
					<h1>Gmail coming soon</h1>
					<button
						type='button'
						onClick={() => this.props.getEmails()}>
						View Labels
					</button>
				</div>
				<div>
					{emails.map(email => (
						<li key={email.id}>{email.name}</li>
					))}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		emails: state.emails,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getEmails: () => dispatch(getEmailsThunk()),
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gmail))
