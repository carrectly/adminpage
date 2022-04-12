import axios from 'axios';

/**
 * ACTION TYPES
 */
const USER_STATE = 'USER_STATE';
const GET_USER = 'GET_USER';
const USER_FAILED = 'USER_FAILED';
const REMOVE_USER = 'REMOVE_USER';
/**
 * INITIAL STATE
 */
const initialState = {
  isAuthorized: null,
  isLoading: false,
  error: null,
};

/**
 * ACTION CREATORS
 */
const isLoadingUserData = () => ({ type: USER_STATE });
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const onUserActionFailed = (error) => {
  return {
    type: USER_FAILED,
    error,
  };
};
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  dispatch(isLoadingUserData());
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data));
  } catch (error) {
    dispatch(onUserActionFailed(error));
    console.error(error);
  }
};

export const auth = (userObj, method) => async (dispatch) => {
  dispatch(isLoadingUserData());
  try {
    const res = await axios.post(`/auth/${method}`, userObj);
    dispatch(getUser(res.data.user));
  } catch (error) {
    dispatch(onUserActionFailed(error));
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_STATE:
      return {
        isLoading: true,
      };
    case GET_USER:
      return {
        isAuthorized: true,
        isLoading: false,
        ...action.user,
      };
    case USER_FAILED:
      return {
        ...state,
        isAuthorized: false,
        error: action.error,
        isLoading: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
