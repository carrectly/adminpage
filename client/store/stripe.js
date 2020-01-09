import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CUSTOMER = 'GET_CUSTOMER'
const CREATE_INVOICE = 'CREATE_INVOICE'
/**
 * INITIAL STATE
 */
const stripe = {
	singleCustomer: {},
	invoice: {},
}

/**
 * ACTION CREATORS
 */
const getCustomer = customer => ({type: GET_CUSTOMER, customer})
const createInvoice = invoice => ({type: CREATE_INVOICE, invoice})
/**
 * THUNK CREATORS
 */
// export const getStripeCustomerThunk = obj => async dispatch => {
// 	try {
// 		const res = await axios.post('/stripe', obj)
// 		dispatch(getCustomer(res.data))
// 	} catch (err) {
// 		console.error(err)
// 	}
// }

export const getStripeCustomerThunk = obj => async dispatch => {
	try {
		const res = await axios.post('/square/customers', obj)
		dispatch(getCustomer(res.data))
	} catch (err) {
		console.error(err)
	}
}

// export const createInvoiceThunk = (obj, id) => async dispatch => {
// 	try {
// 		const res = await axios.post('/stripe/invoices', {obj, id})
// 		dispatch(createInvoice(res.data))
// 	} catch (err) {
// 		console.error(err)
// 	}
// }

export const createInvoiceThunk = (obj, id) => async dispatch => {
	try {
		const res = await axios.post('/square/invoices', {obj, id})
		dispatch(createInvoice(res.data))
	} catch (err) {
		console.error(err)
	}
}
/**
 * REDUCER
 */
export default function(state = stripe, action) {
	switch (action.type) {
		case GET_CUSTOMER:
			return {...state, singleCustomer: action.customer}
		case CREATE_INVOICE:
			return {...state, invoice: action.invoice}
		default:
			return state
	}
}
