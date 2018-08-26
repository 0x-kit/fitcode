import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from 'app/common/reducers/reducers';

import App from 'app/App';
import Root from 'app/root/RootContainer';

import FoodContainer from 'app/food/FoodContainer';
import SearchFoodContainer from 'app/food/diary/add/SearchFoodContainer';
import MineFoodContainer from 'app/food/mine/MineFoodContainer';
import MacrosContainer from 'app/goals/MacrosContainer';
import WeightContainer from 'app/goals/WeightContainer';
import NotFound from 'app/common/NotFound';

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
          <Route path="/food/diary/add/:meal/:id" exact component={SearchFoodContainer} />
          <Route path="/food/diary/:date?" exact component={FoodContainer} />
          <Route path="/food/mine" exact component={MineFoodContainer} />
          <Route path="/goals/diet" exact component={MacrosContainer} />
          <Route path="/goals/weight" exact component={WeightContainer} />
          <Route path="/exercise" exact component={Exercise} />
          <Route path="/" exact component={Root} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
