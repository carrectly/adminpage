import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_EMAILS = 'GET_EMAILS'

/**
 * INITIAL STATE
 */
const allEmails = []

/**
 * ACTION CREATORS
 */
const getEmails = emails => ({type: GET_EMAILS, emails})

/**
 * THUNK CREATORS
 */
export const getEmailsThunk = () => async dispatch => {
	try {
		const res = await axios.get('/auth/google/gmail')
		dispatch(getEmails(res.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = allEmails, action) {
	switch (action.type) {
		case GET_EMAILS:
			return action.emails
		default:
			return state
	}
}
