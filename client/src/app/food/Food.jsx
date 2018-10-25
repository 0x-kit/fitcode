import React, { Component } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import DietGoal from 'app/food/diary/DietGoal.jsx';
import MealCard from 'app/food/diary/MealCard.jsx';

class Food extends Component {
  render() {
    const { loading } = this.props;
    const containerStyle = { marginBottom: '2rem' };
    return (
      <div>
        {loading ? (
          <Dimmer active>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Container style={containerStyle}>
            <DietGoal {...this.props} />
            <MealCard {...this.props} />
          </Container>
        )}
      </div>
    );
  }
}

export default Food;
