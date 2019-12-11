import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_EMAIL = 'GET_SINGLE_EMAIL'

/**
 * INITIAL STATE
 */
const singleEmail = {}

/**
 * ACTION CREATORS
 */
const getSingleEmail = email => ({type: GET_SINGLE_EMAIL, email})

/**
 * THUNK CREATORS
 */
export const getSingleEmailThunk = id => async dispatch => {
	try {
		const res = await axios.get(`/auth/google/gmail/${id}`)
		dispatch(getSingleEmail(res.data))
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
		default:
			return state
	}
}
