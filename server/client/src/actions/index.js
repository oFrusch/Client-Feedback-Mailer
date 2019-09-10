import axios from "axios";
import { FETCH_USER } from "./types";

// make request to backend server to see
// if a user is currently signed in
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
