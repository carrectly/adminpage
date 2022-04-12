import axios from 'axios';

//action type

export const UPDATE_DEALER = 'UPDATE_DEALER';
export const GET_DEALER = 'GET_DEALER';

//action creator

export const updateDealer = (dealer) => {
  return {
    type: UPDATE_DEALER,
    dealer,
  };
};

export const getDealer = (dealer) => {
  return {
    type: GET_DEALER,
    dealer,
  };
};

//thunk creators

export const fetchSingleDealerThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/dealers/${id}`);
      dispatch(getDealer(data));
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const updateDealerThunk = (id, dealer) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/dealers/${id}`, dealer);
      dispatch(updateDealer(data));
    } catch (err) {
      console.log('Error', err);
    }
  };
};

const initialState = {};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEALER: {
      return action.dealer;
    }
    case UPDATE_DEALER: {
      return action.dealer;
    }
    default: {
      return state;
    }
  }
};
