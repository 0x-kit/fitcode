import React, { Component } from 'react';
import { Card, Grid, Statistic, Segment, Header } from 'semantic-ui-react';
import HomeUtils from 'app/food/HomeUtils';
import _ from 'lodash';

class DietGoal extends Component {
  state = { toggleContent: true };
  handleContent = () => this.setState({ toggleContent: !this.state.toggleContent });

  render() {
    const { toggleContent } = this.state;
    const { mealsData, macros, exerciseCals } = this.props;
    const remainingMacros = HomeUtils.macrosRemaining(mealsData, macros);

    return (
      <Card raised fluid onClick={() => this.handleContent()}>
        {!_.isEmpty(mealsData) ? (
          <div style={{ border: '0' }}>
            {!toggleContent
              ? renderCalories(macros, remainingMacros, exerciseCals.calories)
              : renderMacros(macros, remainingMacros)}
          </div>
        ) : (
            <div />
          )}
      </Card>
    );
  }
}

const renderCalories = (goalMacros, remainingMacros, exerciseCals, handleContent) => {
  const { calories } = goalMacros;
  const { rCalories } = remainingMacros;
  const foodValue = calories - rCalories;
  const remainingValue = rCalories + exerciseCals;

  const renderColumn = (label, value) => {
    return (
      <Grid.Column style={{ paddingLeft: '0', paddingRight: '0', width: '16.25%' }} >
        <Statistic value={_.isNaN(value) ? '' : value} label={label} size="mini" className="lxa" />
      </Grid.Column>
    );
  };

  const renderOperator = op => (
    <Grid.Column style={{ paddingLeft: '1.1em', paddingRight: '0.7em', paddingTop: '0.19em', width: '6.25%' }}>
      <Header size="small" content={op} />
    </Grid.Column>
  );

  return (
    <Segment basic style={{ paddingLeft: '0' }}>
      <Grid textAlign="center" style={{ marginRight: '0' }}>
        <Grid.Row style={{ paddingLeft: '0', paddingRight: '0', marginRight: '0.2em', marginLeft: '0.2em' }}>
          {renderColumn('Calories', calories)}
          {renderOperator('-')}
          {renderColumn('Food', foodValue)}
          {renderOperator('+')}
          {renderColumn('Exercise', exerciseCals)}
          {renderOperator('=')}
          {renderColumn('Remaining', remainingValue)}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const renderMacros = (goalMacros, remainingMacros) => {
  const { proteins, carbs, fats } = goalMacros;
  const { rProteins, rCarbs, rFats } = remainingMacros;

  const renderColumn = (label, goal, remaining) => {
    const value = `${goal - remaining}/${goal}G`;
    return (
      <Grid.Column style={{ paddingLeft: '0', paddingRight: '0', width: '33%' }}>
        <Statistic value={_.isNaN(value) ? '' : value} label={label} size="mini" className="lxa" />
      </Grid.Column>
    );
  };

  return (
    <Segment basic padded style={{ paddingLeft: '0', paddingRight: '0' }}>
      <Grid textAlign="center"   style={{ marginRight: '0', marginLeft: '0' }}>
        <Grid.Row style={{ paddingLeft: '0', paddingRight: '0', marginRight: '0.2em', marginLeft: '0.2em' }}>
          {renderColumn('Proteins', proteins, rProteins)}
          {renderColumn('Carbs', carbs, rCarbs)}
          {renderColumn('Fats', fats, rFats)}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
export default DietGoal;
