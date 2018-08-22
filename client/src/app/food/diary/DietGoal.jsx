import React from 'react';
import { Card, List } from 'semantic-ui-react';
import HomeUtils from 'app/food/HomeUtils';

const DietGoal = props => {
  const MacrosList = macros => {
    const { calories, proteins, carbs, fats } = macros;
    return (
      <List size="large" divided horizontal>
        <List.Item as="a">
          <List.Content verticalAlign="middle">
            <List.Header>Calories</List.Header>
            <List.Description>{isNaN(calories) ? '' : calories}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content verticalAlign="middle">
            <List.Header>Proteins</List.Header>
            <List.Description>{isNaN(proteins) ? '' : proteins}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content verticalAlign="middle">
            <List.Header>Carbs</List.Header>
            <List.Description>{isNaN(carbs) ? '' : carbs}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content verticalAlign="middle">
            <List.Header>Fats</List.Header>
            <List.Description>{isNaN(fats) ? '' : fats}</List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  };

  const { mealsData, goalsData, loading } = props;
  let remaining, goalMacros;

  if (goalsData !== undefined) {
    goalMacros = goalsData.macros;
    remaining = HomeUtils.macrosRemaining(mealsData, goalMacros);
  } else {
    goalMacros = {};
    remaining = {};
  }

  return (
    <div>
      {!loading && (
        <div>
          <Card.Group stackable itemsPerRow="2" centered style={{ marginTop: 12}}>
            <Card raised>
              <Card.Content header="Goal" textAlign="center" />
              <Card.Content textAlign="center" extra>
                {MacrosList(goalMacros)}
              </Card.Content>
            </Card>
            <Card raised>
              <Card.Content header="Remaining" textAlign="center" />
              <Card.Content textAlign="center" extra>
                {MacrosList(remaining)}
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      )}
    </div>
  );
};

export default DietGoal;
