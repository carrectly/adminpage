import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const CREATE_EVENT = 'CREATE_EVENT'
/**
 * INITIAL STATE
 */
const allEvents = []

/**
 * ACTION CREATORS
 */
const getEvents = (events) => ({ type: GET_EVENTS, events })
const createEvent = (event) => ({ type: CREATE_EVENT, event })

/**
 * THUNK CREATORS
 */
export const getEventsThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/google/calendar')
    dispatch(getEvents(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const createEventThunk = (obj) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/google/calendar/newevent', obj)
    dispatch(createEvent(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = allEvents, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events
    case CREATE_EVENT:
      return action.event
    default:
      return state
  }
}
