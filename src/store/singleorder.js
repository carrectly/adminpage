import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER';
const UPDATE_SINGLE_ORDER = 'UPDATE_SINGLE_ORDER';
const UPDATE_ORDER_DETAILS = 'UPDATE_ORDER_DETAILS';
const ADD_ORDER_SERVICE = 'ADD_ORDER_SERVICE';
const REMOVE_ORDER_SERVICE = 'REMOVE_ORDER_SERVICE';
const ADD_ORDER_DEALER = 'ADD_ORDER_DEALER';
const REMOVE_ORDER_DEALER = 'REMOVE_ORDER_DEALER';
const ADD_ORDER_DRIVER = 'ADD_ORDER_DRIVER';
const ADD_ORDER_CUSTOMER_REP = 'ADD_ORDER_CUSTOMER_REP';

/**
 * INITIAL STATE
 */
const singleOrder = {};

/**
 * ACTION CREATORS
 */
const getSingleOrder = (order) => ({ type: GET_SINGLE_ORDER, order });
const updateSingleOrder = (order) => ({ type: UPDATE_SINGLE_ORDER, order });
const updateOrderDetails = (order) => ({ type: UPDATE_ORDER_DETAILS, order });
const addOrderService = (order) => ({ type: ADD_ORDER_SERVICE, order });
const removeOrderService = (order) => ({ type: REMOVE_ORDER_SERVICE, order });
const addOrderDealer = (order) => ({ type: ADD_ORDER_DEALER, order });
const removeOrderDealer = (order) => ({ type: REMOVE_ORDER_DEALER, order });
const addOrderDriver = (order) => ({ type: ADD_ORDER_DRIVER, order });
const addOrderCustomerRep = (order) => ({ type: ADD_ORDER_CUSTOMER_REP, order });

/**
 * THUNK CREATORS
 */
export const getSingleOrderThunk = (orderid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/single/${orderid}`);
    dispatch(getSingleOrder(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const updateSingleOrderThunk = (orderid, obj) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/single/${orderid}`, obj);
    dispatch(updateSingleOrder(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const updateOrderDetailsThunk = (id, obj) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/single/services/${id}`, obj);
    const resp = await axios.get(`/api/orders/single/${id}`);
    dispatch(updateOrderDetails(resp.data));
  } catch (err) {
    console.error(err);
  }
};

export const addOrderServiceThunk = (orderId, serviceId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/orders/single/services/${orderId}/${serviceId}`);
    const resp = await axios.get(`/api/orders/single/${orderId}`);
    dispatch(addOrderService(resp.data));
  } catch (err) {
    console.error(err);
  }
};

export const removeOrderServiceThunk = (id, obj) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/single/removeservice/${id}`, obj);
    const resp = await axios.get(`/api/orders/single/${id}`);
    dispatch(removeOrderService(resp.data));
  } catch (err) {
    console.error(err);
  }
};

export const addOrderDealerThunk = (orderid, dealerId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/orders/single/dealers/${orderid}`, {
      dealerId,
    });
    dispatch(addOrderDealer(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const removeOrderDealerThunk = (orderid, dealerId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/single/dealers/${orderid}`, {
      dealerId,
    });
    dispatch(removeOrderDealer(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addOrderDriverThunk = (id, obj) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/orders/single/driver/${id}`, obj);
    dispatch(addOrderDriver(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addOrderCustomerRepThunk = (id, userId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/orders/single/customerRep/${id}`, {
      userId,
    });
    dispatch(addOrderCustomerRep(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
// eslint-disable-next-line complexity
export default function (state = singleOrder, action) {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return action.order;
    case UPDATE_SINGLE_ORDER:
      return action.order;
    case UPDATE_ORDER_DETAILS:
      return action.order;
    case ADD_ORDER_SERVICE:
      return action.order;
    case REMOVE_ORDER_SERVICE:
      return action.order;
    case ADD_ORDER_DEALER:
      return action.order;
    case REMOVE_ORDER_DEALER:
      return action.order;
    case ADD_ORDER_DRIVER:
      return action.order;
    case ADD_ORDER_CUSTOMER_REP:
      return action.order;
    default:
      return state;
  }
}
