import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_SINGLE_ORDER = 'UPDATE_SINGLE_ORDER'
/**
 * INITIAL STATE
 */
const singleOrder = {}

/**
 * ACTION CREATORS
 */
const getSingleOrder = order => ({type: GET_SINGLE_ORDER, order})
const updateSingleOrder = order => ({type: UPDATE_SINGLE_ORDER, order})

/**
 * THUNK CREATORS
 */
export const getSingleOrderThunk = orderid => async dispatch => {
	try {
		const res = await axios.get(`/api/orders/single/${orderid}`)
		dispatch(getSingleOrder(res.data[0]))
	} catch (err) {
		console.error(err)
	}
}

export const updateSingleOrderThunk = (orderid, obj) => async dispatch => {
	try {
		const res = await axios.put(`/api/orders/single/${orderid}`, obj)
		dispatch(updateSingleOrder(res.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = singleOrder, action) {
	switch (action.type) {
		case GET_SINGLE_ORDER:
			return action.order
		case UPDATE_SINGLE_ORDER:
			return action.order
		default:
			return state
	}
}
