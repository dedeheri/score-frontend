import apis from "../../api/apis";
import { FAILED_LOAD_DATA_USER, LOAD_USER_DATA } from "./action-type";

import { config } from "../../config/headers";

export const setLoadUser = () => async (dispatch) => {
  try {
    const { data } = await apis.get(`/staff`, config);
    dispatch({ type: LOAD_USER_DATA, payload: data });
  } catch (error) {
    dispatch({
      type: FAILED_LOAD_DATA_USER,
      payload: error.response.data.massage,
    });
  }
};

export const getLoadUserTeacher = () => {
  return async (dispatch) => {
    try {
      const { data } = await apis.get(`/teacher/`, config);
      dispatch({ type: LOAD_USER_DATA, payload: data });
    } catch (error) {
      dispatch({
        type: FAILED_LOAD_DATA_USER,
        payload: error.response.data.massage,
      });
    }
  };
};

export const getLoadUserStudent = () => {
  return async (dispatch) => {
    try {
      const { data } = await apis.get(`/student`, config);
      dispatch({ type: LOAD_USER_DATA, payload: data });
    } catch (error) {
      dispatch({
        type: FAILED_LOAD_DATA_USER,
        payload: error.response.data.massage,
      });
    }
  };
};
