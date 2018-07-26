import React, { Component } from 'react';
import { Container, Responsive } from 'semantic-ui-react';
import requireAuth from 'components/requireAuth';
import MainContainer from 'components/MainContainer';
import HomeContainer from 'components/home/HomeContainer';
import Food from 'components/food/Food';
import Exercise from 'components/exercise/Exercise';

class Main extends Component {
  render() {
    const tabs = [
      {
        name: 'myHome',
        label: 'My home',
        component: HomeContainer
      },
      { name: 'food', label: 'Food', component: Food },
      { name: 'exercise', label: 'Exercise', component: Exercise }
    ];

    return (
      <div style={{ marginTop: 80 }}>
        <Responsive as={Container}>
          <MainContainer tabs={tabs} size="large" tabular />
        </Responsive>
      </div>
    );
  }
}

export default requireAuth(Main);
