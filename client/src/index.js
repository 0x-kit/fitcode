import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from 'app/common/reducers/reducers';

import App from 'app/App';
import Welcome from 'app/WelcomeContainer';
import Home from 'app/home/HomeContainer';
import HomeNew from 'app/home/new/HomeNewContainer';

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
        <Switch>
          <Route path="/home/new" component={HomeNew} />
          <Route path="/home" component={Home} />
          <Route path="/food" component={Food} />
          <Route path="/exercise" component={Exercise} />
          <Route path="/" exact component={Welcome} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
