import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_EMAILS = 'GET_EMAILS';
const CLEAR_EMAILS = 'CLEAR_EMAILS';
/**
 * INITIAL STATE
 */
const allEmails = [];

/**
 * ACTION CREATORS
 */
const getEmails = (emails) => ({ type: GET_EMAILS, emails });
const clearEmails = (emails) => ({ type: CLEAR_EMAILS, emails });

/**
 * THUNK CREATORS
 */
export const getEmailsThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/auth/google/gmail/${id}`);
    dispatch(getEmails(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const clearEmailsThunk = () => (dispatch) => {
  try {
    dispatch(clearEmails([]));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = allEmails, action) {
  switch (action.type) {
    case GET_EMAILS:
      return action.emails;
    case CLEAR_EMAILS:
      return action.emails;
    default:
      return state;
  }
}
