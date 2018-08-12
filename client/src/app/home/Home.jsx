import React, { Component } from 'react';
import { Segment, Container, Dimmer, Loader } from 'semantic-ui-react';

import DietGoal from 'app/home/DietGoal.jsx';
import MealCard from 'app/home/MealCard.jsx';
import Date from 'app/home/Date.jsx';

class HomeComponent extends Component {
  componentDidUpdate(prevProps) {
    if (!this.props.date.isSame(prevProps.date)) {
      this.props.complexFetchHome(this.props.date);
    }
  }

  render() {
    const { loading } = this.props;

    console.log('render()');

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

export default HomeComponent;
