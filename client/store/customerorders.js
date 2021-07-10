import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CUSTOMER_ORDERS = 'GET_CUSTOMER_ORDERS'

/**
 * INITIAL STATE
 */
const customerOrders = []

/**
 * ACTION CREATORS
 */
const getCustomerOrders = orders => ({type: GET_CUSTOMER_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const getCustomerOrdersThunk = userid => async dispatch => {
	try {
		const res = await axios.get(`/api/orders/${userid}`)
		dispatch(getCustomerOrders(res.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = customerOrders, action) {
	switch (action.type) {
		case GET_CUSTOMER_ORDERS:
			return action.orders
		default:
			return state
	}
}
