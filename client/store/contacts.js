import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CONTACTS = 'GET_CONTACTS'
const CREATE_CONTACT = 'CREATE_CONTACT'
/**
 * INITIAL STATE
 */
const allContacts = []

/**
 * ACTION CREATORS
 */
const getContacts = contacts => ({type: GET_CONTACTS, contacts})
const createContact = contact => ({type: CREATE_CONTACT, contact})
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
/**
 * REDUCER
 */
export default function(state = allContacts, action) {
	switch (action.type) {
		case GET_CONTACTS:
			return action.contacts
		case CREATE_CONTACT:
			return action.contact
		default:
			return state
	}
}
