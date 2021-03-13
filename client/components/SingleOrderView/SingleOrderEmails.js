import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEmailsThunk} from '../../store/emails'
import SingleEmail from './SingleEmail.js'
import {getSingleEmailThunk} from '../../store/singleemail'
import ErrorHandler from './ErrorHandler'
import {Spin, Space} from 'antd'

class SingleOrderEmails extends Component {
	constructor(props) {
		super(props)
		this.state = {spinner: false}
		this.handleClick = this.handleClick.bind(this)
		// this.handleSend = this.handleSend.bind(this)
	}

	async componentDidMount() {
		// TODO: fix the spinner and email fetching
		let id = this.props.match.params.orderid
		let temp = this.state.spinner
		this.setState({spinner: !temp})
		await this.props.fetchEmails()
		this.setState({spinner: temp})
	}

	async handleClick(evt) {
		try {
			await this.props.getSingleEmail(evt.target.id)
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const emails = this.props.emails || []
		const single = this.props.singleemail || {}

		return (
			<div>
				<h3 className='gmailheader'>Order Email History</h3>
				<div className='emailboard'>
					<div className='emailsubject'>
						<h3 className='eheader'>Email Subject</h3>
						{this.state.spinner ? (
							<Space size='middle'>
								<Spin size='large' />
							</Space>
						) : (
							emails.map(email => (
								<div
									key={email.id}
									id={email.id}
									onClick={id => this.handleClick(id)}>
									Subject: {email.Subject}
									<br />
									From: {email.From}
									<br />
									Date: {email.Date}
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
		user: state.user,
		emails: state.emails,
		singleemail: state.singleemail.decoded,
		order: state.singleorder,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getEmails: id => dispatch(getEmailsThunk(id)),
		getSingleEmail: id => dispatch(getSingleEmailThunk(id)),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleOrderEmails)
)
