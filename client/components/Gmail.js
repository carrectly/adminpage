import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEmailsThunk} from '../store/emails'
import SingleEmail from './SingleEmail.js'
import {getSingleEmailThunk} from '../store/singleemail'

class Gmail extends Component {
	render() {
		const emails = this.props.emails || []
		const single = this.props.singleemail || {}
		return (
			<div>
				<div>
					<h1>
						Gmail coming soon{' '}
						<span>
							<button
								type='button'
								onClick={() => this.props.getEmails()}>
								View Emails
							</button>
						</span>
					</h1>{' '}
				</div>
				<div className='emailboard'>
					<div className='emailsubject'>
						<h3>Email Subject</h3>
						{emails.map(email => (
							<li
								key={email.id}
								onClick={() =>
									this.props.getSingleEmail(email.id)
								}>
								{email.id}
							</li>
						))}
					</div>
					<div className='emailcontent'>
						<h3>Message Preview</h3>
						{single ? (
							<div>
								<SingleEmail single={single} />
							</div>
						) : (
							<div />
						)}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		emails: state.emails,
		singleemail: state.singleemail,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getEmails: () => dispatch(getEmailsThunk()),
		getSingleEmail: id => dispatch(getSingleEmailThunk(id)),
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gmail))
