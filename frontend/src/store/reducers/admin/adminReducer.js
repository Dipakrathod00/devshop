import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_REQUEST_SUCCESS,
  ADMIN_PRODUCT_REQUEST_FAIL,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_REQUEST_SUCCESS,
  ADMIN_USERS_REQUEST_FAIL,
  ISADMIN_REQUEST,
  ISADMIN_REQUEST_SUCCESS,
  ISADMIN_REQUEST_FAIL,
  ISACTIVE_REQUEST,
  ISACTIVE_REQUEST_SUCCESS,
  ISACTIVE_REQUEST_FAIL,
} from "../../constants/adminContstants";
import {
  PRODUCT_PUBLISH_UNPUBLISH_FAIL,
  PRODUCT_PUBLISH_UNPUBLISH_REQUEST,
  PRODUCT_PUBLISH_UNPUBLISH_SUCCESS,
} from "../../constants/productConstants";

export const adminReducer = (
  state = {
    products: [],
    users: [],
  },
  { type, payload }
) => {
  switch (type) {
    case ISACTIVE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ISACTIVE_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case ISACTIVE_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ISADMIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ISADMIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case ISADMIN_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_USERS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case ADMIN_USERS_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
      };
    case ADMIN_PRODUCT_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case PRODUCT_PUBLISH_UNPUBLISH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_PUBLISH_UNPUBLISH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        publishEdit: true,
      };
    case PRODUCT_PUBLISH_UNPUBLISH_FAIL:
      return {
        ...state,
        isLoading: false,
        publishEdit: false,
        error: payload,
      };
    default:
      return state;
  }
};
