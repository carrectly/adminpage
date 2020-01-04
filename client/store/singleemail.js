import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_EMAIL = 'GET_SINGLE_EMAIL'
const SEND_SINGLE_EMAIL = 'SEND_SINGLE_EMAIL'
const CLEAR_SINGLE_EMAIL = 'CLEAR_SINGLE_EMAIL'
/**
 * INITIAL STATE
 */
const singleEmail = {}

/**
 * ACTION CREATORS
 */
const getSingleEmail = email => ({type: GET_SINGLE_EMAIL, email})
const sendSingleEmail = email => ({type: SEND_SINGLE_EMAIL, email})
const clearSingleEmail = email => ({type: CLEAR_SINGLE_EMAIL, email})
/**
 * THUNK CREATORS
 */
export const getSingleEmailThunk = id => async dispatch => {
	try {
		const res = await axios.get(`/auth/google/gmail/single/${id}`)
		dispatch(getSingleEmail(res.data))
	} catch (err) {
		console.error(err)
	}
}

export const sendSingleEmailThunk = obj => async dispatch => {
	try {
		const res = await axios.post(`/auth/google/gmail/send`, obj)
		dispatch(sendSingleEmail(res.data))
	} catch (err) {
		console.error(err)
	}
}

export const clearSingleEmailThunk = () => dispatch => {
	try {
		dispatch(clearSingleEmail({}))
	} catch (err) {
		console.error(err)
	}
}
/**
 * REDUCER
 */
export default function(state = singleEmail, action) {
	switch (action.type) {
		case GET_SINGLE_EMAIL:
			return action.email
		case SEND_SINGLE_EMAIL:
			return action.email
		case CLEAR_SINGLE_EMAIL:
			return action.email
		default:
			return state
	}
}
