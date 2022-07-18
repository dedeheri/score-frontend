import Cookies from "js-cookie";
import objectHash from "object-hash";
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_START } from "./action-type";
import apis from "../../api/apis";

import { config } from "../../config/headers";

export const setLogin = (identityNumber, password, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_START });

      const { data } = await apis.post(
        "/signin",
        {
          identityNumber,
          password,
        },
        config
      );
      Cookies.set("secure-To", data?.accessToken);
      Cookies.set("secure-2nd", objectHash(data?.users?.role));
      Cookies.set("uid", data?.users._id);
      dispatch({ type: LOGIN_SUCCESS, payload: data });

      if (data?.users?.role === "Staff") {
        navigate("/staff");
      }

      if (data?.users?.role === "Teacher") {
        navigate("/teacher");
      }

      if (data?.users?.role === "Student") {
        navigate("/student");
      }
    } catch (error) {
      console.log(error.response?.data);

      dispatch({
        type: LOGIN_FAILED,
        payload: error.response.data,
      });
    }
  };
};
