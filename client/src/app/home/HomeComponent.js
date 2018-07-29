import React from 'react';
import {
  Segment,
  Responsive,
  Container,
  Dimmer,
  Loader
} from 'semantic-ui-react';

import DietSummary from 'app/home/diet/DietSummary';
import TabMeals from 'app/home/meals/TabMeals';

const HomeComponent = props => {
  const { loading, dietsummary, mealsData } = props;
  return (
    <Responsive as={Container}>
      {loading ? (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        <Segment padded>
          <DietSummary
            as={Segment}
            dietsummary={dietsummary}
            loading={loading}
          />
          <TabMeals meals={mealsData} loading={loading} />
        </Segment>
      )}
    </Responsive>
  );
};

export default HomeComponent;
