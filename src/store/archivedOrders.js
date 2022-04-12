import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const DELETE_ORDER = 'DELETE_ORDER';

/**
 * INITIAL STATE
 */
const allOrders = [];

/**
 * ACTION CREATORS
 */
const getAllOrders = (orders) => ({ type: GET_ALL_ORDERS, orders });
const deleteSingleOrder = (hash) => ({ type: DELETE_ORDER, hash });

/**
 * THUNK CREATORS
 */
export const getAllOrdersThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/orders');
    dispatch(getAllOrders(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteOrderThunk = (hash) => async (dispatch) => {
  try {
    await axios.delete(`/api/orders/${hash}`);
    dispatch(deleteSingleOrder(hash));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = allOrders, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders;
    case DELETE_ORDER:
      return state.filter((order) => order.hash !== action.hash);
    default:
      return state;
  }
}
