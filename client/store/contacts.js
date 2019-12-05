import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CONTACTS = 'GET_CONTACTS'

/**
 * INITIAL STATE
 */
const allContacts = []

/**
 * ACTION CREATORS
 */
const getContacts = contacts => ({type: GET_CONTACTS, contacts})

/**
 * THUNK CREATORS
 */
export const getContactsThunk = () => async dispatch => {
	try {
		const res = await axios.get('/auth/google/contacts')
		dispatch(getContacts(res.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = allContacts, action) {
	switch (action.type) {
		case GET_CONTACTS:
			return action.contacts
		default:
			return state
	}
}
