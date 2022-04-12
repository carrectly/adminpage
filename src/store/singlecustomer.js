import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_SINGLE_CUSTOMER = 'GET_SINGLE_CUSTOMER';
const UPDATE_SINGLE_CUSTOMER = 'UPDATE_SINGLE_CUSTOMER';
/**
 * INITIAL STATE
 */
const singleCustomer = {};

/**
 * ACTION CREATORS
 */
const getSingleCustomer = (customer) => ({ type: GET_SINGLE_CUSTOMER, customer });
const updateSingleCustomer = (customer) => ({
  type: UPDATE_SINGLE_CUSTOMER,
  customer,
});

/**
 * THUNK CREATORS
 */
export const getSingleCustomerThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/customers/single/${id}`);
    dispatch(getSingleCustomer(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const updateSingleCustomerThunk = (id, obj) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/customers/single/${id}`, obj);
    dispatch(updateSingleCustomer(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = singleCustomer, action) {
  switch (action.type) {
    case GET_SINGLE_CUSTOMER:
      return action.customer;
    case UPDATE_SINGLE_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
}
