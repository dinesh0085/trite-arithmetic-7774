import axios from "axios";
import {
  GET_LOGGED_USER,
  LOGIN_ERROR,
  LOGIN_ERROR_EMPTY_FIELD,
  LOGIN_ERROR_INAVLID_DETAILS,
  LOGIN_ERROR_NOT_REGISTERED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from "../user.types";

const login = (info) => async (dispatch) => {
  const loginUrl = "https://sore-erin-sockeye-tam.cyclic.app/api/user/login";
  dispatch({ type: LOGIN_LOADING });
  // On Success
  try {
    let res = await axios.post(loginUrl, info);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.Token });
    console.log(res);
    return res;
  } catch (err) {
    // All Errors Here
    console.log(err);
    const status = err.response.status;
    const errorMessage = err.response.data.Message;

    if (status === 401) {
      dispatch({ type: LOGIN_ERROR_INAVLID_DETAILS, payload: errorMessage });
    }
    if (status === 405) {
      dispatch({ type: LOGIN_ERROR_NOT_REGISTERED, payload: errorMessage });
    }
    if (status === 406) {
      dispatch({ type: LOGIN_ERROR_EMPTY_FIELD, payload: errorMessage });
    } else {
      dispatch({ type: LOGIN_ERROR, payload: errorMessage });
    }
  }
};

export const getUser = (info) => async (dispatch) => {
  const loggedUserUrl =
    "https://sore-erin-sockeye-tam.cyclic.app/api/user/loggedUser";

  try {
    let res = await axios.get(
      loggedUserUrl,
      {},
      {
        headers: {
          Authorization: `${info}`,
        },
      },
    );

    console.log(res);
    dispatch({ type: GET_LOGGED_USER, payload: res });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default login;
