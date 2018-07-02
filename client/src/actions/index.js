import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

// redux thunk: inside 1 action creator we can dispatch as many actions as we wish at any given time
export const signup = formProps => async dispatch => {
  let response;
  try {
    response = await axios.post(
      "http://localhost:3000/api/auth/signup",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data.token });
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
  }
};
