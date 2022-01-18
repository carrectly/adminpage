import axios from 'axios'

//action type
const GET_SERVICES = 'GET_SERVICES'
const ADD_SERVICE = 'ADD_SERVICE'
const UPDATE_SERVICE = 'UPDATE_SERVICE'

//action creator
const getServices = services => ({type: GET_SERVICES, services})
const addService = service => ({type: ADD_SERVICE, service})
const updateService = service => ({type: UPDATE_SERVICE, service})

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

export const addServiceThunk = obj => {
	return async dispatch => {
		try {
			const {data} = await axios.post('/api/services', obj)
			dispatch(addService(data))
		} catch (err) {
			console.log('Error', err)
		}
	}
}

export const updateServiceThunk = (id, obj) => {
	return async dispatch => {
		try {
			const {data} = await axios.put(`/api/services/${id}`, obj)
			dispatch(updateService(data))
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
		case ADD_SERVICE:
			return [action.service, ...state]
		case UPDATE_SERVICE:
			return state.map(service => {
				if (service.id === action.service.id) {
					return action.service
				} else {
					return service
				}
			})
		default:
			return state
	}
}
