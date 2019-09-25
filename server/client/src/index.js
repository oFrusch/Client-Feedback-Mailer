// styling
import "materialize-css/dist/css/materialize.min.css";

// default
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

// custom created
import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

console.log("strip key is: ", process.env.REACT_APP_STRIPE_KEY);
console.log("env is: ", process.env.NODE_ENV);
