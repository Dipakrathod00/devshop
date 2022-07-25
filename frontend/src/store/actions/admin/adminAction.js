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
} from "./../../constants/adminContstants";
// admin
import axios from "axios";

export const adminProductAction = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: getState().user.login.token,
      },
    };
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get("/product/admin/product", config);
    dispatch({
      type: ADMIN_PRODUCT_REQUEST_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST_FAIL,
      payload: error,
    });
  }
};
export const adminGetAllUsersAction = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: getState().user.login.token,
      },
    };
    dispatch({ type: ADMIN_USERS_REQUEST });
    const { data } = await axios.get("/user", config);
    dispatch({
      type: ADMIN_USERS_REQUEST_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USERS_REQUEST_FAIL,
      payload: error,
    });
  }
};

export const userIsAdminAction = (id, val) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: getState().user.login.token,
      },
    };
    dispatch({ type: ISADMIN_REQUEST });
    const { data } = await axios.put(
      `/user/isadmin/${id}`,
      { isAdmin: val },
      config
    );
    dispatch({
      type: ISADMIN_REQUEST_SUCCESS,
      // payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: ISADMIN_REQUEST_FAIL,
      payload: error,
    });
  }
};
export const userIsActiveAction = (id, val) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: getState().user.login.token,
      },
    };
    dispatch({ type: ISADMIN_REQUEST });
    const { data } = await axios.put(
      `/user/deactivate/${id}`,
      { isActive: val },
      config
    );
    dispatch({
      type: ISADMIN_REQUEST_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ISADMIN_REQUEST_FAIL,
      payload: error,
    });
  }
};
