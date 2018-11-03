import React, { Component } from 'react';
import { Card, Grid, Statistic, Segment, Header } from 'semantic-ui-react';
import transform from 'app/common/Transformations';
import _ from 'lodash';

const rowStyle = { paddingLeft: '0', paddingRight: '0', marginRight: '0.2em', marginLeft: '0.2em' };
const cardStyle = { marginBottom: '0.8rem' };
const divStyle = { border: '0' };

class DietGoal extends Component {
  state = { toggleContent: false };
  handleContent = () => this.setState({ toggleContent: !this.state.toggleContent });

  render() {
    const { toggleContent } = this.state;
    const {
      mealsData,
      macros,
      exerciseCals: { calories }
    } = this.props;
    
    const remainingMacros = transform.macrosRemaining(mealsData, macros);

    return (
      <Card style={cardStyle} raised fluid onClick={() => this.handleContent()}>
        {!_.isEmpty(mealsData) ? (
          <div style={divStyle}>
            {!toggleContent ? renderCalories(macros, remainingMacros, calories) : renderMacros(macros, remainingMacros)}
          </div>
        ) : (
          <div />
        )}
      </Card>
    );
  }
}

const renderCalories = (goalMacros, remainingMacros, exerciseCals) => {
  const { calories } = goalMacros;
  const { rCalories } = remainingMacros;
  const foodValue = calories - rCalories;
  const remainingValue = rCalories + exerciseCals;
  const valueStyle = { paddingLeft: '0', paddingRight: '0', width: '16.25%' };
  const opStyle = { paddingLeft: '1.1em', paddingRight: '0.7em', paddingTop: '0.19em', width: '6.25%' };
  const segmentStyle = { paddingLeft: '0', marginRight: '0.5em', marginLeft: '0.5em' };
  const gridStyle = { marginRight: '0' };

  const renderColumn = (label, value) => (
    <Grid.Column style={valueStyle}>
      <Statistic value={_.isNaN(value) ? '' : value} label={label} size="mini" className="lxa" />
    </Grid.Column>
  );

  const renderOperator = op => (
    <Grid.Column style={opStyle}>
      <Header size="small" content={op} />
    </Grid.Column>
  );

  return (
    <Segment basic style={segmentStyle}>
      <Grid textAlign="center" style={gridStyle}>
        <Grid.Row style={rowStyle}>
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
  const segmentStyle = { paddingLeft: '0', paddingRight: '0' };
  const gridStyle = { marginRight: '0', marginLeft: '0' };
  const columnStyle = { paddingLeft: '0', paddingRight: '0', width: '33%' };

  const renderColumn = (label, goal, remaining) => {
    const value = `${goal - remaining}/${goal}G`;
    return (
      <Grid.Column style={columnStyle}>
        <Statistic value={_.isNaN(value) ? '' : value} label={label} size="mini" className="lxa" />
      </Grid.Column>
    );
  };

  return (
    <Segment basic style={segmentStyle}>
      <Grid textAlign="center" style={gridStyle}>
        <Grid.Row style={rowStyle}>
          {renderColumn('Proteins', proteins, rProteins)}
          {renderColumn('Carbs', carbs, rCarbs)}
          {renderColumn('Fats', fats, rFats)}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
export default DietGoal;
