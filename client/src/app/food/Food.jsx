import React, { Component } from 'react';
import { Segment, Container, Dimmer, Loader, Transition } from 'semantic-ui-react';

import DietGoal from 'app/food/diary/DietGoal.jsx';
import MealCard from 'app/food/diary/MealCard.jsx';
import Date from 'app/food/diary/Date.jsx';

class Food extends Component {
  render() {
    const { loading } = this.props;

    return (
      <Transition visible={!loading} animation="fade" duration={700}>
        <Container>
          <Segment padded>
            <Date {...this.props} />
            <DietGoal {...this.props} />
            <MealCard {...this.props} />
          </Segment>
        </Container>
      </Transition>
    );
  }
}

export default Food;
