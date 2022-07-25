import {
  ORDER_REQUEST,
  ORDER_REQUEST_SUCCESS,
  ORDER_REQUEST_FAIL,
  ORDER_REMOVE_PLACEDORDER,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_REQUEST_SUCCESS,
  ORDER_HISTORY_REQUEST_FAIL,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_REQUEST_SUCCESS,
  UPDATE_STATUS_REQUEST_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from "./../constants/orderConstants";
export const orderReducer = (state = { orders: [], myOrders: [] }, { type, payload }) => {
  switch (type) {
    
    case ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        placedOrder: payload,
      };
    case ORDER_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ORDER_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_HISTORY_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
      };
    case ORDER_HISTORY_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case UPDATE_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_STATUS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: payload,
      };
    case UPDATE_STATUS_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ORDER_REMOVE_PLACEDORDER:
      return {};

      case GET_MY_ORDERS_REQUEST:
        return { isLoading: true };
      case GET_MY_ORDERS_SUCCESS:
        return { isLoading: false, myOrders: payload };
      case GET_MY_ORDERS_FAIL:
        return { isLoading: false, error: payload };

    default:
      return state;
  }
};
