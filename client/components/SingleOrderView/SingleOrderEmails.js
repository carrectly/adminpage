import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEmailsThunk} from '../../store/emails'
import SingleEmail from './SingleEmail.js'
import {getSingleEmailThunk} from '../../store/singleemail'
import ErrorHandler from './ErrorHandler'
import {Spin, Space} from 'antd'
import EmailSummaryCard from '../Email/EmailSummaryCard'

import './styles.scss'

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
				<h3>Order Email History</h3>
				<div className='emailboard'>
					<div className='emailsubject'>
						<h3 className='eheader'>Email Subject</h3>
						<div className='emailSummary'>
							{emails.map(email => (
								<EmailSummaryCard
									email={email}
									key={email.id}
								/>
							))}
						</div>
					</div>
					<div className='emailcontent'>
						<h3 className='eheader'>Message Preview</h3>
						<div className='emailcontentdetails'>
							<ErrorHandler>
								<SingleEmail />
							</ErrorHandler>
						</div>
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
