import React from 'react';
import {
  Segment,
  Responsive,
  Container,
  Dimmer,
  Loader
} from 'semantic-ui-react';

import DietGoal from 'app/home/DietGoal.jsx';
import MealCard from 'app/home/MealCard.jsx';

const HomeComponent = props => {
  const { loading } = props;
  const { mealsData, goalsData } = props;

  return (
    <Responsive as={Container}>
      {loading ? (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        <Segment padded>
          <DietGoal goalsData={goalsData} meals={mealsData} loading={loading} />
          <MealCard meals={mealsData} loading={loading} />
        </Segment>
      )}
    </Responsive>
  );
};

export default HomeComponent;
