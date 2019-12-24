import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEmailsThunk} from '../store/emails'
import SingleEmail from './SingleEmail.js'
import {getSingleEmailThunk} from '../store/singleemail'
import ErrorHandler from './ErrorHandler'
import Spinner from 'react-bootstrap/Spinner'
import {Modal, Button} from 'react-bootstrap'

class Gmail extends Component {
	constructor(props) {
		super(props)
		this.state = {spinner: false, showModal: false}
		this.handleClick = this.handleClick.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleShow = this.handleShow.bind(this)
	}

	async handleClick() {
		let temp = this.state.spinner
		this.setState({spinner: !temp})
		await this.props.getEmails()
		this.setState({spinner: temp})
	}

	handleShow() {
		console.log('clicking')
		this.setState({showModal: true})
	}

	handleClose() {
		console.log('clicking')
		this.setState({showModal: false})
	}

	render() {
		const emails = this.props.emails || []
		const single = this.props.singleemail || {}
		let attachments = this.props.attachments || []
		console.log('attachment IN REACT', attachments)
		let modalArray = []
		if (attachments.length >= 1) {
			modalArray = attachments.map(attch => {
				attch.attachment = attch.attachment
					.replace(/-/g, '+')
					.replace(/_/g, '/')
				return attch
				//modalArray.push(img)
				//console.log('modal array', modalArray)
			})
			// let input = attachments[0].attachment
			// firstImg = input.replace(/-/g, '+').replace(/_/g, '/')
			// let TYPED_ARRAY = new Uint8Array(attachments[0].attachment.data)
			// const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
			// 	return data + String.fromCharCode(byte)
			// }, '')
			// firstImg = btoa(STRING_CHAR)
			//console.log('atob attachment IN REACT', firstImg)
		}

		// attachments = attachments.map(el => {
		// 	return el.attachment.data.data
		// })
		// console.log('attachment IN REACT', attachments)

		return (
			<div>
				<div>
					<span>
						<button
							type='button'
							onClick={() => this.handleClick()}>
							View Emails
						</button>
					</span>
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
								<div className='attachments'>
									{modalArray.length ? (
										modalArray.map((item, index) =>
											item.type.slice(0, 5) ===
											'image' ? (
												<img
													key={index}
													src={`data:image/png;base64,${item.attachment}`}
												/>
											) : (
												<Button
													variant='dark'
													key={index}>
													<a
														href={`data:${item.type};base64,${item.attachment}`}
														download={`${item.filename}`}>
														{item.filename}
													</a>
												</Button>
											)
										)
									) : (
										<div />
									)}
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
