import axios from 'axios';

//action type
export const GET_DRIVERS = 'GET_DRIVERS';
export const ADD_DRIVER = 'ADD_DRIVER';
export const REMOVE_DRIVER = 'REMOVE_DRIVER';
export const UPDATE_DRIVER = 'UPDATE_DRIVER';

//action creator
export const getDrivers = (drivers) => {
  return {
    type: GET_DRIVERS,
    drivers,
  };
};

export const addDriver = (driver) => {
  return {
    type: ADD_DRIVER,
    driver,
  };
};

export const removeDriver = (id) => {
  return {
    type: REMOVE_DRIVER,
    id,
  };
};

export const updateDriver = (driver) => {
  return {
    type: UPDATE_DRIVER,
    driver,
  };
};

//thunk creators

export const fetchDriversThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/drivers');
      dispatch(getDrivers(data));
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const addDriverThunk = (driver) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/drivers', driver);
      dispatch(addDriver(data));
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const removeDriverThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/drivers/${id}`);
      dispatch(removeDriver(id));
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const updateDriverThunk = (id, driver) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/drivers/${id}`, driver);
      dispatch(updateDriver(data));
    } catch (err) {
      console.log('Error', err);
    }
  };
};

const initialState = [];

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS: {
      return action.drivers;
    }
    case ADD_DRIVER: {
      return [...state, action.driver];
    }
    case REMOVE_DRIVER: {
      return state.filter((bot) => bot.id !== Number(action.id));
    }
    case UPDATE_DRIVER: {
      return state.map((el) => {
        if (el.id === action.driver.id) {
          return action.driver;
        } else {
          return el;
        }
      });
    }
    default: {
      return state;
    }
  }
};
