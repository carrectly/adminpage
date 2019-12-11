import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEmailsThunk} from '../store/emails'
import SingleEmail from './SingleEmail.js'
import {getSingleEmailThunk} from '../store/singleemail'
import ErrorHandler from './ErrorHandler'
import Spinner from 'react-bootstrap/Spinner'
import LazyImage from './LazyImage'
import logo from '/Users/abirkus/Desktop/carrectly/adminpage/server/auth/image.png'

class Gmail extends Component {
	constructor(props) {
		super(props)
		this.state = {spinner: false}
		this.handleClick = this.handleClick.bind(this)
	}

	async handleClick() {
		let temp = this.state.spinner
		this.setState({spinner: !temp})
		await this.props.getEmails()
		this.setState({spinner: temp})
	}
	render() {
		const emails = this.props.emails || []
		const single = this.props.singleemail || {}
		let attachments = this.props.attachments || []
		console.log(attachments)
		attachments = attachments.map(el => {
			return el.attachment.data.data
		})

		return (
			<div>
				<div>
					<h1>
						Gmail coming soon{' '}
						<span>
							<button
								type='button'
								onClick={() => this.handleClick()}>
								View Emails
							</button>
						</span>
					</h1>
				</div>
				<div className='emailboard'>
					<div className='emailsubject'>
						<h3 className='eheader'>Email Subject</h3>
						{this.state.spinner ? (
							<Spinner animation='border' role='status'>
								<span className='align-self-center sr-only'>
									Loading...
								</span>
							</Spinner>
						) : (
							emails.map(email => (
								<div key={email.id}>
									<a
										onClick={() =>
											this.props.getSingleEmail(email.id)
										}>
										<div>
											Subject: {email.Subject}
											<br />
											From: {email.From}
											<br />
											Date: {email.Date}
										</div>
									</a>
									<hr />
								</div>
							))
						)}
					</div>
					<div className='emailcontent'>
						<h3 className='eheader'>Message Preview</h3>
						{single ? (
							<div className='emailcontentdetails'>
								<ErrorHandler>
									<SingleEmail single={single} />
								</ErrorHandler>
								<div className='attachements'>
									{attachments.map(el => (
										<p key={1}>
											<img src={logo} />
											{/* <LazyImage
												unloadedSrc={require(`/Users/abirkus/Desktop/carrectly/adminpage/server/auth/image.png`)}
												src={require(`/Users/abirkus/Desktop/carrectly/adminpage/server/auth/image.png`)}
											/> */}
										</p>
									))}
								</div>
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
		singleemail: state.singleemail.decoded,
		attachments: state.singleemail.attachmentsArray,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getEmails: () => dispatch(getEmailsThunk()),
		getSingleEmail: id => dispatch(getSingleEmailThunk(id)),
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gmail))
