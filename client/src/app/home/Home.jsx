import React, { Component } from 'react';
import {
  Segment,
  Responsive,
  Container,
  Dimmer,
  Loader
} from 'semantic-ui-react';

import DietGoal from 'app/home/DietGoal.jsx';
import MealCard from 'app/home/MealCard.jsx';

class HomeComponent extends Component {
  render() {
    const { loading } = this.props;
    const { mealsData, goalsData, match } = this.props;

    return (
      <Responsive as={Container}>
        {loading ? (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : (
          <Segment padded>
            {/* <Card fluid color="red" header="Option 1" /> */}
            <DietGoal
              goalsData={goalsData}
              meals={mealsData}
              loading={loading}
            />
            <MealCard match={match} meals={mealsData} loading={loading} />
          </Segment>
        )}
      </Responsive>
    );
  }
}

export default HomeComponent;
