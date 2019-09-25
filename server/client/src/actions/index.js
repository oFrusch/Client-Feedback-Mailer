import axios from "axios";
import { FETCH_USER } from "./types";

// make request to backend server to see
// if a user is currently signed in
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  // fetch user again because we are simply updating their
  // amount of credits. We just want to update the content on their
  // webpage by refetching them
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
