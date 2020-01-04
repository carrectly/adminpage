import axios from 'axios'

//action type
const GET_SERVICES = 'GET_SERVICES'

//action creator
const getServices = services => ({type: GET_SERVICES, services})

//thunk creators

export const fetchServicesThunk = () => {
	return async dispatch => {
		try {
			const {data} = await axios.get('/api/services')
			dispatch(getServices(data))
		} catch (err) {
			console.log('Error', err)
		}
	}
}

const initialState = []

//reducer
export default (state = initialState, action) => {
	switch (action.type) {
		case GET_SERVICES:
			return action.services
		default:
			return state
	}
}
