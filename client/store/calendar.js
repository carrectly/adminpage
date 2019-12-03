import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'

/**
 * INITIAL STATE
 */
const allEvents = []

/**
 * ACTION CREATORS
 */
const getEvents = events => ({type: GET_EVENTS, events})

/**
 * THUNK CREATORS
 */
export const getEventsThunk = () => async dispatch => {
	try {
		const res = await axios.get('/auth/google/calendar')
		dispatch(getEvents(res.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = allEvents, action) {
	switch (action.type) {
		case GET_EVENTS:
			return action.events
		default:
			return state
	}
}
