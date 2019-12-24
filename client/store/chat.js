import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CHAT = 'GET_CHAT'

/**
 * INITIAL STATE
 */
const chatArr = []

/**
 * ACTION CREATORS
 */
const getChat = chat => ({type: GET_CHAT, chat})

/**
 * THUNK CREATORS
 */
export const getChatThunk = () => async dispatch => {
	try {
		const res = await axios.get('/auth/google/chat')
		dispatch(getChat(res.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = chatArr, action) {
	switch (action.type) {
		case GET_CHAT:
			return action.chat
		default:
			return state
	}
}
