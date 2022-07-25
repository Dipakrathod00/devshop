import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAIL,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  
} from "./../constants/userConstants";
export const userReducer = (
  state = { login: {} },
  { type, payload }
) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        isLoading: false,
        login: payload,
      };
    case LOGIN_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case SIGNUP_REQUEST:
      return { isLoading: true };
    case SIGNUP_REQUEST_SUCCESS:
      return { isLoading: false, signup: true };
    case SIGNUP_REQUEST_FAIL:
      return { isLoading: false, error: payload };

    case FORGET_PASSWORD_REQUEST:
      return { isLoading: true };
    case FORGET_PASSWORD_SUCCESS:
      return { isLoading: false, emailSend: true };
    case FORGET_PASSWORD_FAIL:
      return { isLoading: false, emailSend: false, error: payload };

   

    case LOGOUT:
      return {};
    default:
      return state;
  }
};
