import React from 'react'
import {useDispatch} from 'react-redux'
import {getSingleEmailThunk} from '../../store/singleemail'
import moment from 'moment'

const EmailSummaryCard = props => {
	const dispatch = useDispatch()
	const email = props.email

	const handleClick = () => {
		dispatch(getSingleEmailThunk(email.id))
	}

	return (
		<div id={email.id} onClick={handleClick}>
			<div className='subheader'>Subject:</div>
			<div className='subcontent'>{email.Subject}</div>
			<div className='subheader'>From:</div>
			<div className='subcontent'>{email.From}</div>
			<div className='subheader'>To:</div>
			<div className='subcontent'>{email.To}</div>
			<div className='subheader'>Received:</div>
			<div className='subcontent'>
				{moment(email.Date).format('M/D/YY hh:mm A')}
			</div>
			<hr />
		</div>
	)
}

export default EmailSummaryCard
