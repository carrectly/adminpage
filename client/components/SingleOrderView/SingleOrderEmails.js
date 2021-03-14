import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getEmailsThunk, clearEmailsThunk} from '../../store/emails'
import SingleEmail from './SingleEmail.js'
import ErrorHandler from './ErrorHandler'
import {useDispatch, useSelector} from 'react-redux'
import EmailSummaryCard from '../Email/EmailSummaryCard'
import './styles.scss'

const SingleOrderEmails = () => {
	const params = useParams()
	const id = params.orderid
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getEmailsThunk(id))
		return function cleanup() {
			dispatch(clearEmailsThunk())
		}
	}, [])

	const emails = useSelector(state => state.emails)

	return (
		<div>
			<h3 className='sectionHeader'>Order Email History</h3>
			<div className='emailboard'>
				<div className='emailsubject'>
					<h3 className='eheader'>Email Subject</h3>
					<div className='emailSummary'>
						{emails.length ? (
							<div>
								{emails.map(email => (
									<EmailSummaryCard
										email={email}
										key={email.id}
									/>
								))}
							</div>
						) : (
							<div>No emails found for this order</div>
						)}
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

export default SingleOrderEmails
