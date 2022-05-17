import axios from 'axios';
import { isEmpty } from 'lodash';

/**
 * ACTION TYPES
 */
const USER_STATE = 'USER_STATE';
const GET_USER = 'GET_USER';
const USER_FAILED = 'USER_FAILED';
const REMOVE_USER = 'REMOVE_USER';
const USER_AUTHORIZE = 'USER_AUTHORIZE';
const USER_UNAUTHORIZE = 'USER_UNAUTHORIZE';
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
const authorizeUser = (user) => ({ type: USER_AUTHORIZE, user });
const unauthorizeUser = () => ({ type: USER_UNAUTHORIZE });
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  dispatch(isLoadingUserData());
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data));
    if (typeof res.data === 'object' && !isEmpty(res.data)) {
      dispatch(authorizeUser(res.data));
    } else {
      dispatch(unauthorizeUser());
    }
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
    dispatch(authorizeUser(res.data.user));
  } catch (error) {
    dispatch(onUserActionFailed(error));
    dispatch(unauthorizeUser());
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    dispatch(unauthorizeUser());
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
        isLoading: false,
        ...action.user,
      };
    case USER_AUTHORIZE:
      return {
        ...action.user,
        isAuthorized: true,
        isLoading: false,
      };
    case USER_UNAUTHORIZE:
      return {
        ...action.user,
        isAuthorized: false,
        isLoading: false,
      };
    case USER_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
