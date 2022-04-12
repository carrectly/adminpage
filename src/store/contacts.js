import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CONTACTS = 'GET_CONTACTS';
const CREATE_CONTACT = 'CREATE_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';
/**
 * INITIAL STATE
 */
const allContacts = [];

/**
 * ACTION CREATORS
 */
const getContacts = (contacts) => ({ type: GET_CONTACTS, contacts });
const createContact = (contact) => ({ type: CREATE_CONTACT, contact });
const deleteSingleContact = (phone) => ({ type: DELETE_CONTACT, phone });
/**
 * THUNK CREATORS
 */
export const getContactsThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/customers/');
    dispatch(getContacts(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const createContactThunk = (obj) => async (dispatch) => {
  try {
    const res = await axios.get('/auth/google/contacts');
    dispatch(createContact(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteContactThunk = (phone) => async (dispatch) => {
  try {
    await axios.delete(`/api/customers/${phone}`);
    dispatch(deleteSingleContact(phone));
  } catch (err) {
    window.alert(
      'Customer has more than one order. Please delete orders before deleting the customer!',
    );
  }
};

/**
 * REDUCER
 */
export default function (state = allContacts, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return action.contacts;
    case CREATE_CONTACT:
      return action.contact;
    case DELETE_CONTACT:
      return state.filter((contact) => contact.phoneNumber !== action.phone);
    default:
      return state;
  }
}
