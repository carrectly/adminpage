import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const updateSingleUser = user => ({type: UPDATE_SINGLE_USER, user})

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

export const updateSingleUserThunk = (userid, obj) => async dispatch => {
	try {
		const res = await axios.put(`/api/users/${userid}`, obj)
		dispatch(updateSingleUser(res.data))
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
		case UPDATE_SINGLE_USER:
			return state.map(user => {
				if (user.id === action.user.id) {
					user = action.user
				}
				return user
			})
		default:
			return state
	}
}
