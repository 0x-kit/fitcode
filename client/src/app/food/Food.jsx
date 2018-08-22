import React, { Component } from 'react';
import { Segment, Container, Dimmer, Loader } from 'semantic-ui-react';

import DietGoal from 'app/food/diary/DietGoal.jsx';
import MealCard from 'app/food/diary/MealCard.jsx';
import Date from 'app/food/diary/Date.jsx';

class Food extends Component {
  render() {
    const { loading } = this.props;
    console.log(this.props.goalsData);
    return (
      <Container>
        {loading ? (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : (
          <Segment padded>
            <Date {...this.props} />
            <DietGoal {...this.props} />
            <MealCard {...this.props} />
          </Segment>
        )}
      </Container>
    );
  }
}

export default Food;
