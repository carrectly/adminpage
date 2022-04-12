import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER_ORDERS = 'GET_USER_ORDERS';

/**
 * INITIAL STATE
 */
const userOrders = [];

/**
 * ACTION CREATORS
 */
const getUserOrders = (orders) => ({ type: GET_USER_ORDERS, orders });

/**
 * THUNK CREATORS
 */
export const getUserOrdersThunk = (email) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/driver/${email}`);
    dispatch(getUserOrders(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = userOrders, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
