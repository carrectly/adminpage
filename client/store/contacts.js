import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CONTACTS = 'GET_CONTACTS'
const CREATE_CONTACT = 'CREATE_CONTACT'
const GET_CONTACTS_BY_QUERY = 'GET_CONTACTS_BY_QUERY'
const CLEAR_CONTACTS = 'CLEAR_CONTACTS'
/**
 * INITIAL STATE
 */
const allContacts = []

/**
 * ACTION CREATORS
 */
const getContacts = contacts => ({type: GET_CONTACTS, contacts})
const createContact = contact => ({type: CREATE_CONTACT, contact})
const getContactsByQuery = contacts => ({type: GET_CONTACTS_BY_QUERY, contacts})
const clearContacts = contacts => ({type: CLEAR_CONTACTS, contacts})
/**
 * THUNK CREATORS
 */
export const getContactsThunk = () => async dispatch => {
	try {
		const res = await axios.get('/api/customers/')
		dispatch(getContacts(res.data))
	} catch (err) {
		console.error(err)
	}
}

export const getContactsByQueryThunk = obj => async dispatch => {
	try {
		const res = await axios.put(`/api/customers`, obj)
		dispatch(getContactsByQuery(res.data))
	} catch (err) {
		console.error(err)
	}
}

export const createContactThunk = obj => async dispatch => {
	try {
		obj = {
			emailAddresses: [{value: 'john@doe.com'}],
			names: [
				{
					displayName: 'John Doe',
					familyName: 'Doe',
					givenName: 'John',
				},
			],
		}

		const res = await axios.post('/auth/google/contacts', obj)
		dispatch(createContact(res.data))
	} catch (err) {
		console.error(err)
	}
}

export const clearContactsThunk = () => async dispatch => {
	try {
		dispatch(clearContacts([]))
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
		case CREATE_CONTACT:
			return action.contact
		case GET_CONTACTS_BY_QUERY:
			return [action.contacts]
		case CLEAR_CONTACTS:
			return action.contacts
		default:
			return state
	}
}
