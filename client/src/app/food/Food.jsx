import React, { Component } from 'react';
import { Segment, Transition, Divider } from 'semantic-ui-react';
import DietGoal from 'app/food/diary/DietGoal.jsx';
import MealCard from 'app/food/diary/MealCard.jsx';
import Date from 'app/food/diary/Date.jsx';

class Food extends Component {
  render() {
    const { loading } = this.props;

    return (
      <Transition.Group animation="fade" duration={700}>
        {!loading && (
          <Segment raised>
            <Date {...this.props} />
            <DietGoal {...this.props} />
            <Divider horizontal />
            <MealCard {...this.props} />
          </Segment>
        )}
      </Transition.Group>
    );
  }
}

export default Food;
