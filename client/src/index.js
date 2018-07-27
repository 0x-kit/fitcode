import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from 'reducers';

import App from 'components/App';
import Welcome from 'components/Welcome';
import Signout from 'components/auth/SignOut';
import SocialRedirect from 'components/auth/SocialRedirect';

import Home from 'components/home/HomeContainer';
import Food from 'components/food/FoodContainer';
import Exercise from 'components/exercise/ExerciseContainer';

const store = createStore(
  reducers,
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
        <Route path="/social" component={SocialRedirect} />
        <Route path="/home" component={Home} />
        <Route path="/food" component={Food} />
        <Route path="/exercise" component={Exercise} />
        <Route path="/auth/signout" component={Signout} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
