import axios from 'axios'

//action type
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'

//action creator
export const getComments = comments => {
	return {
		type: GET_COMMENTS,
		comments,
	}
}

export const addComment = comment => {
	return {
		type: ADD_COMMENT,
		comment,
	}
}

export const clearComments = comments => {
	return {
		type: CLEAR_COMMENTS,
		comments,
	}
}
//thunk creators

export const fetchCommentsThunk = id => {
	return async dispatch => {
		try {
			const {data} = await axios.get(`/api/comments/${id}`)
			dispatch(getComments(data))
		} catch (err) {
			console.log('Error', err)
		}
	}
}

export const addCommentThunk = (id, comment) => {
	return async dispatch => {
		try {
			const {data} = await axios.post(`/api/comments/${id}`, comment)
			dispatch(addComment(data))
		} catch (err) {
			console.log('Error', err)
		}
	}
}

export const clearCommentsThunk = () => {
	return dispatch => {
		try {
			dispatch(clearComments())
		} catch (err) {
			console.log('Error', err)
		}
	}
}

const initialState = []

//reducer
export default (state = initialState, action) => {
	switch (action.type) {
		case GET_COMMENTS: {
			return action.comments
		}
		case ADD_COMMENT: {
			return [...state, action.comment]
		}
		case CLEAR_COMMENTS: {
			return initialState
		}
		default: {
			return state
		}
	}
}
