import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_TOKEN = 'GET_TOKEN'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getToken = user => ({type: GET_TOKEN, user})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
	try {
		const res = await axios.get('/auth/me')
		dispatch(getUser(res.data))
		history.push('/account')
	} catch (err) {
		console.error(err)
	}
}

export const getTokenThunk = () => async dispatch => {
	try {
		const res = await axios.get('/auth/google/googleclient')
		window.open(res.data)
		dispatch(getToken())
	} catch (err) {
		console.error(err)
	}
}

export const auth = (email, password, method) => async dispatch => {
	try {
		const res = await axios.post(`/auth/${method}`, {email, password})
		dispatch(getUser(res.data.user))
		history.push('/account')
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr)
	}
}

export const logout = () => async dispatch => {
	try {
		await axios.post('/auth/logout')
		dispatch(removeUser())
		history.push('/account')
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user
		case REMOVE_USER:
			return defaultUser
		default:
			return state
	}
}
