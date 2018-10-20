import React, { Component } from 'react';
import { Segment, Divider, Dimmer, Loader } from 'semantic-ui-react';
import DietGoal from 'app/food/diary/DietGoal.jsx';
import MealCard from 'app/food/diary/MealCard.jsx';
import Date from 'app/food/diary/Date.jsx';

class Food extends Component {
  render() {
    const { loading } = this.props;

    return (
      <div>
        {loading ? (
          <Dimmer active>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Segment raised>
            <Date {...this.props} />
            <DietGoal {...this.props} />
            <Divider horizontal style={{ marginBottom: '0' }} />
            <MealCard {...this.props} />
          </Segment>
        )}
      </div>
    );
  }
}

export default Food;
