import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'
const DELETE_USER = 'DELETE_USER'
/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = (users) => ({ type: GET_USERS, users })
const updateSingleUser = (user) => ({ type: UPDATE_SINGLE_USER, user })
const deleteSingleUser = (id) => ({ type: DELETE_USER, id })

/**
 * THUNK CREATORS
 */

export const getUsersThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/')
    dispatch(getUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateSingleUserThunk = (userid, obj) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/${userid}`, obj)
    dispatch(updateSingleUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUserThunk = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(deleteSingleUser(id))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case UPDATE_SINGLE_USER:
      return state.map((user) => {
        if (user.id === action.user.id) {
          user = action.user
        }
        return user
      })
    case DELETE_USER:
      return state.filter((user) => user.id !== action.id)
    default:
      return state
  }
}
