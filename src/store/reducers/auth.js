import { AUTH_REMOVE_TOKEN, AUTH_SET_TOKEN, AUTH_SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
  token: null,
  expiryDate: null,
  userEmail: null,
  userId: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      };
    case AUTH_SET_CURRENT_USER:
      return {
        ...state,
        userEmail: action.userEmail,
        userId: action.userId
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
    default:
      return state;
  }
};

export default reducer;