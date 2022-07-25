import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_REQUEST,
  ORDER_REQUEST_FAIL,
  ORDER_REQUEST_SUCCESS,
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
} from "../constants/orderConstants";

export const placeOrderAction = (cartItem) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    console.log(cartItem);
    const config = {
      headers: {
        Authorization: getState().user.login.token,
      },
    };
    const { data } = await axios.post("/order", cartItem, config);
    dispatch({ type: ORDER_REQUEST_SUCCESS, payload: data });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("localCart");
  } catch (error) {
    dispatch({ type: ORDER_REQUEST_FAIL, payload: error });
  }
};

export const removePlacedOrderAction = () => (dispatch) =>
  dispatch({ type: ORDER_REMOVE_PLACEDORDER });

export const getAllOrderAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_HISTORY_REQUEST });
    console.log(getState().user.login.token);
    const config = {
      headers: {
        Authorization: getState().user.login.token,
      },
    };
    const { data } = await axios.get("/order", config);
    dispatch({ type: ORDER_HISTORY_REQUEST_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: ORDER_HISTORY_REQUEST_FAIL, payload: error });
  }
};

export const updateOrderStatusAction =
  (id, val) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_STATUS_REQUEST });
      const config = {
        headers: {
          Authorization: getState().user.login.token,
        },
      };
      const { data } = await axios.put(
        `/order/status/${id}`,
        { status: val },
        config
      );
      dispatch({ type: UPDATE_STATUS_REQUEST_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_STATUS_REQUEST_FAIL, payload: error });
    }
  };

export const getMyOrdersAction = (id) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: getState().user.login.token,
      },
    };
    dispatch({ type: GET_MY_ORDERS_REQUEST });
    const { data } = await axios.get(`/order/myorders`, config);
    console.log(data);
    dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: GET_MY_ORDERS_FAIL, payload: error });
  }
};
