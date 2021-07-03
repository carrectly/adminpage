import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})

/**
 * THUNK CREATORS
 */

export const getUsersThunk = () => async dispatch => {
	try {
		const res = await axios.get('/api/users/')
		dispatch(getUsers(res.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
	switch (action.type) {
		case GET_USERS:
			return action.users
		default:
			return state
	}
}
