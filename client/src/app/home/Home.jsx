import React from 'react';
import {
  Segment,
  Responsive,
  Container,
  Dimmer,
  Loader
} from 'semantic-ui-react';

import DietGoal from 'app/home/diet/DietGoal.jsx';
import MealCard from 'app/home/meals/MealCard.jsx';

const HomeComponent = props => {
  const { loading, dietGoal, mealsData } = props;

  return (
    <Responsive as={Container}>
      {loading ? (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        <Segment padded>
          <DietGoal
            dietGoal={dietGoal}
            mealsData={mealsData}
            loading={loading}
          />
          <MealCard
            dietGoal={dietGoal}
            mealsData={mealsData}
            loading={loading}
          />
        </Segment>
      )}
    </Responsive>
  );
};

export default HomeComponent;
