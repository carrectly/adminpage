import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ACTIVE_ORDERS = 'GET_ACTIVE_ORDERS';
const GET_DETAILER_ORDERS = 'GET_DETAILER_ORDERS';
/**
 * INITIAL STATE
 */
const allOrders = [];

/**
 * ACTION CREATORS
 */
const getActiveOrders = (orders) => ({ type: GET_ACTIVE_ORDERS, orders });
const getDetailerOrders = (orders) => ({ type: GET_DETAILER_ORDERS, orders });

/**
 * THUNK CREATORS
 */
export const getActiveOrdersThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/orders/active');
    dispatch(getActiveOrders(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const getDetailerOrdersThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/orders/detailing');
    dispatch(getDetailerOrders(res.data));
  } catch (err) {
    console.error(err);
  }
};
/**
 * REDUCER
 */
export default function (state = allOrders, action) {
  switch (action.type) {
    case GET_ACTIVE_ORDERS:
      return action.orders;
    case GET_DETAILER_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
