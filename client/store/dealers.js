import axios from 'axios'

//action type
export const GET_DEALERS = 'GET_DEALERS'
export const ADD_DEALER = 'ADD_DEALER'
export const REMOVE_DEALER = 'REMOVE_DEALER'
export const UPDATE_DEALER = 'UPDATE_DEALER'

//action creator
export const getDealers = dealers => {
	return {
		type: GET_DEALERS,
		dealers,
	}
}

export const addDealer = dealer => {
	return {
		type: ADD_DEALER,
		dealer,
	}
}

export const removeDealer = id => {
	return {
		type: REMOVE_DEALER,
		id,
	}
}

export const updateDealer = dealer => {
	return {
		type: UPDATE_DEALER,
		dealer,
	}
}

//thunk creators

export const fetchDealersThunk = () => {
	return async dispatch => {
		try {
			const {data} = await axios.get('/api/dealers')
			dispatch(getDealers(data))
		} catch (err) {
			console.log('Error', err)
		}
	}
}

export const addDealerThunk = dealer => {
	return async dispatch => {
		try {
			const {data} = await axios.post('/api/dealers', dealer)
			dispatch(addDealer(data))
		} catch (err) {
			console.log('Error', err)
		}
	}
}

export const removeDealerThunk = id => {
	return async dispatch => {
		try {
			await axios.delete(`/api/dealers/${id}`)
			dispatch(removeDealer(id))
		} catch (err) {
			console.log('Error', err)
		}
	}
}

export const updateDealerThunk = (id, dealer) => {
	return async dispatch => {
		try {
			const {data} = await axios.put(`/api/dealers/${id}`, dealer)
			dispatch(updateDealer(data))
		} catch (err) {
			console.log('Error', err)
		}
	}
}

const initialState = []

//reducer
export default (state = initialState, action) => {
	switch (action.type) {
		case GET_DEALERS: {
			return action.dealers
		}
		case ADD_DEALER: {
			return [...state, action.dealer]
		}
		case REMOVE_DEALER: {
			return state.filter(bot => bot.id !== Number(action.id))
		}
		case UPDATE_DEALER: {
			return state.map(el => {
				if (el.id === action.dealer.id) {
					return action.dealer
				} else {
					return el
				}
			})
		}
		default: {
			return state
		}
	}
}
