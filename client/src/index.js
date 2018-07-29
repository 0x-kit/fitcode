import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

import App from 'app/App';
import Welcome from 'app/Welcome';
import Home from 'app/home/HomeContainer';
const Food = () => <div>Food</div>;
const Exercise = () => <div>Exercise</div>;

const store = createStore(
  rootReducer,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/home" component={Home} />
        <Route path="/food" component={Food} />
        <Route path="/exercise" component={Exercise} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
