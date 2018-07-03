import 'semantic-ui-css/semantic.min.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/SignUp";
import Feature from "./components/Feature";
import Signout from "./components/auth/SignOut";
import Signin from "./components/auth/SignIn";


const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/signout" component={Signout} />
        <Route path="/auth/signin" component={Signin} />
        <Route path="/feature" component={Feature} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
