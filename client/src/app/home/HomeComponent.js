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
import TabBarContainer from 'app/home/meals/TabBarContainer';

const Breakfast = () => <div>Breakfast content</div>;

const Lunch = () => <div>Lunch content</div>;

const Snacks = () => <div>Snacks content</div>;

const Dinner = () => <div>Dinner content</div>;

const Others = () => <div>Others content</div>;

const tabs = [
  { name: 'breakfast', label: 'Breakfast', component: Breakfast },
  { name: 'lunch', label: 'Lunch', component: Lunch },
  { name: 'snacks', label: 'Snacks', component: Snacks },
  {
    name: 'dinner',
    label: 'Dinner',
    component: Dinner
  },
  {
    name: 'others',
    label: 'Others',
    component: Others
  }
];

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
          {/* <TabMeals meals={mealsData} loading={loading} /> */}
          <TabBarContainer tabs={tabs} />
        </Segment>
      )}
    </Responsive>
  );
};

export default HomeComponent;
