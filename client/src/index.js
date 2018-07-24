import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "reducers";

import App from "components/App";
import Welcome from "components/Welcome";
import Home from "components/Home";
import Signout from "components/auth/SignOut";
import SocialRedirect from "components/auth/SocialRedirect";

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
        <Route path="/auth/signout" component={Signout} />
        <Route path="/social" component={SocialRedirect} />
        <Route path="/home" component={Home} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
