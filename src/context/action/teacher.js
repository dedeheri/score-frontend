import Cookies from "js-cookie";
import apis from "../../api/apis";
import { toast } from "react-toastify";

import {
  ADD_DATA_SCORE,
  FAILED_ADD_DATA_SCORE,
  FAILED_GET_DATA_SCORE,
  FAILED_GET_DETAIL_SCORE,
  FAILED_GET_INFORMATION_STUDENT,
  GET_DATA_SCORE,
  GET_DETAIL_SCORE,
  GET_INFORMATION_STUDENT,
} from "./action-type";

// headers
import { config } from "../../config/headers";
import * as actionType from "../actionType/actionTypeTeacher";

export const verify = (identityNumber) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionType.START_VERIFY_TEACHER });
      const { data } = await apis.post(
        `/signup/teacher`,
        {
          identityNumber,
        },
        config
      );
      dispatch({ type: actionType.SUCCESS_VERIFY_TEACHER, payload: data });
    } catch (error) {
      dispatch({
        type: actionType.FAILED_VERIFY_TEACHER,
        payload: error.response.data,
      });
    }
  };
};

export const setVerifyNextStep = (search, email, password, repeatPassword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionType.START_INPUT_PASSWORD });
      const { data } = await apis.post(
        `/signup/teacher/next${search}`,
        {
          email,
          password,
          repeatPassword,
        },
        config
      );
      dispatch({
        type: actionType.SUCCESS_INPUT_PASSWORD,
        payload: data,
      });
      toast.success("Berhasil membuat akun");

      if (data?.message === "Success") {
        setInterval(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: actionType.FAILED_INPUT_PASSWORD,
        payload: error.response.data,
      });
    }
  };
};

export const getScore = (search) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "Application/json",
        authorization: `Bearer ${Cookies.get("secure-To")}`,
      },
    };

    try {
      const { data } = await apis.get(`/teacher/score${search}`, config);
      dispatch({ type: GET_DATA_SCORE, payload: data });
    } catch (error) {
      dispatch({ type: FAILED_GET_DATA_SCORE, payload: error });
    }
  };
};

export const postScore = (
  studentName,
  attendance,
  bcOne,
  bcTwo,
  bcThree,
  bcFour,
  midtermExam,
  finalExams,
  course
) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "Application/json",
        authorization: `Bearer ${Cookies.get("secure-To")}`,
      },
    };

    try {
      const { data } = await apis.post(
        `/teacher/score/add-score`,
        {
          studentName,
          attendance,
          bcOne,
          bcTwo,
          bcThree,
          bcFour,
          midtermExam,
          finalExams,
          course,
        },
        config
      );

      dispatch({ type: ADD_DATA_SCORE, payload: data });
      toast.success("Berhasil Hapus Data");
    } catch (error) {
      dispatch({
        type: FAILED_ADD_DATA_SCORE,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getInformationStudent = () => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "Application/json",
        authorization: `Bearer ${Cookies.get("secure-To")}`,
      },
    };

    try {
      const { data } = await apis.get("/teacher/informationstudent", config);
      dispatch({ type: GET_INFORMATION_STUDENT, payload: data });
    } catch (error) {
      dispatch({ type: FAILED_GET_INFORMATION_STUDENT, payload: error });
    }
  };
};

export const getDetailScore = (params) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "Application/json",
        authorization: `Bearer ${Cookies.get("secure-To")}`,
      },
    };

    try {
      const { data } = await apis.get(`/teacher/score/detail${params}`, config);
      dispatch({ type: GET_DETAIL_SCORE, data: data });
    } catch (error) {
      dispatch({
        type: FAILED_GET_DETAIL_SCORE,
        error: error.response.data.message,
      });
    }
  };
};
