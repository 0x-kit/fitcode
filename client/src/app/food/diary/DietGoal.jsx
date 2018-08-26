import React, { Component } from 'react';
import { Card, Grid, Statistic, Segment } from 'semantic-ui-react';
import HomeUtils from 'app/food/HomeUtils';
import _ from 'lodash';

class DietGoal extends Component {
  state = { toggleContent: false };
  handleContent = () => this.setState({ toggleContent: !this.state.toggleContent });
  render() {
    const { mealsData, macros, loading } = this.props;
    const { toggleContent } = this.state;

    if (!loading) {

      const remainingMacros = HomeUtils.macrosRemaining(mealsData, macros);

      return (
        <Card onClick={() => this.handleContent()} raised fluid>
          {!toggleContent ? calSummary(macros, remainingMacros) : macrosSummary(macros, remainingMacros)}
        </Card>
      );
    }
  }
}

const calSummary = (goalMacros, remainingMacros) => {
  const { calories } = goalMacros;
  const { rCalories } = remainingMacros;

  const renderColumn = (label, columnSize, value) => {
    return (
      <Grid.Column computer={columnSize}>
        <Statistic value={value} label={label} size="mini" className="lxa" />
      </Grid.Column>
    );
  };

  return (
    <Segment textAlign="center" padded>
      <Grid textAlign="center">
        <Grid.Row>
          {renderColumn('Calories', 3, calories)}
          {renderColumn('', 1, '-')}
          {renderColumn('Food', 3, calories - rCalories)}
          {renderColumn('', 1, '+')}
          {renderColumn('Exercise', 3, 0)}
          {renderColumn('', 1, '=')}
          {renderColumn('Remaining', 3, rCalories)}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const macrosSummary = (goalMacros, remainingMacros) => {
  const { proteins, carbs, fats } = goalMacros;
  const { rProteins, rCarbs, rFats } = remainingMacros;

  const renderColumn = (label, columnSize, goal, remaining) => {
    const value = goal - remaining;
    return (
      <Grid.Column computer={columnSize}>
        <Statistic value={`${value} / ${goal} G`} label={label} size="mini" className="lxa" />
      </Grid.Column>
    );
  };

  return (
    <Segment textAlign="center" padded>
      <Grid textAlign="center">
        <Grid.Row>
          {renderColumn('Proteins', 5, proteins, rProteins)}
          {renderColumn('Carbs', 5, carbs, rCarbs)}
          {renderColumn('Fats', 5, fats, rFats)}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
export default DietGoal;
