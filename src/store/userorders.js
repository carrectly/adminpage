import axios from 'axios';

/**
 * ACTION TYPES
 */
const USER_ORDER_STATE = 'USER_ORDER_STATE';
const GET_USER_ORDERS = 'GET_USER_ORDERS';

/**
 * INITIAL STATE
 */
const userOrders = {
  isLoading: true,
  data: [],
};

/**
 * ACTION CREATORS
 */
const isLoadingData = () => ({ type: USER_ORDER_STATE });
const getUserOrders = (orders) => ({ type: GET_USER_ORDERS, orders });

/**
 * THUNK CREATORS
 */
export const getUserOrdersThunk = (email) => async (dispatch) => {
  dispatch(isLoadingData());
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
    case USER_ORDER_STATE:
      return {
        isLoading: true,
      };
    case GET_USER_ORDERS:
      return { ...state, data: action.orders, isLoading: false };
    default:
      return state;
  }
}
