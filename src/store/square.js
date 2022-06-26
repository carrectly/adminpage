import axios from 'axios';
import moment from 'moment';
import { tz } from 'moment-timezone';

/**
 * ACTION TYPES
 */
const GET_CUSTOMER = 'GET_CUSTOMER';
const CREATE_INVOICE = 'CREATE_INVOICE';
const CLEAR_SQUARE = 'CLEAR_SQUARE';
/**
 * INITIAL STATE
 */
const initialstate = {
  singleCustomer: {},
  invoice: {},
};

/**
 * ACTION CREATORS
 */
const getCustomer = (customer) => ({ type: GET_CUSTOMER, customer });
const createInvoice = (invoice) => ({ type: CREATE_INVOICE, invoice });
const clearSquare = (obj) => ({ type: CLEAR_SQUARE, obj });
/**
 * THUNK CREATORS
 */
export const getSquareCustomerThunk = (phone) => async (dispatch) => {
  try {
    const res = await axios.get(`/square/customers/${phone}`);
    dispatch(getCustomer(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const createInvoiceThunk = (obj, id) => async (dispatch) => {
  try {
    const utc_date = moment.utc().format('YYYY-MM-DD HH:mm:ss Z');
    const due_date = moment(utc_date).tz('America/Chicago').add(1, 'days').format('YYYY-MM-DD');
    const res = await axios.post('/square/invoices', { obj, id, due_date });
    dispatch(createInvoice(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const clearSquareThunk = () => (dispatch) => {
  try {
    dispatch(clearSquare(initialstate));
  } catch (err) {
    console.error(err);
  }
};
/**
 * REDUCER
 */
export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_CUSTOMER:
      return { ...state, singleCustomer: action.customer };
    case CREATE_INVOICE:
      return { ...state, invoice: action.invoice };
    case CLEAR_SQUARE:
      return action.obj;
    default:
      return state;
  }
}
