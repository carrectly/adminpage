import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

/**
 * INITIAL STATE
 */
const allOrders = []

/**
 * ACTION CREATORS
 */
const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const getAllOrdersThunk = () => async dispatch => {
	try {
		const res = await axios.get('/api/orders')
		dispatch(getAllOrders(res.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = allOrders, action) {
	switch (action.type) {
		case GET_ALL_ORDERS:
			return action.orders
		default:
			return state
	}
}
