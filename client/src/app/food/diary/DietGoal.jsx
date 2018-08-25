import React from 'react';
import { Card, List } from 'semantic-ui-react';
import HomeUtils from 'app/food/HomeUtils';
import _ from 'lodash';

const DietGoal = props => {
  const { mealsData, macros } = props;
  const cardGroupStyle = { marginTop: 12 };
  let remainingMacros, goalMacros;

  if (macros !== undefined && !_.isEmpty(macros)) {
    goalMacros = macros;
    remainingMacros = HomeUtils.macrosRemaining(mealsData, goalMacros);
  }

  return (
    <div>
      {goalMacros &&
        remainingMacros && (
          <div>
            <Card.Group stackable itemsPerRow="2" centered style={cardGroupStyle}>
              <Card raised>
                <Card.Content header="Goal" textAlign="center" />
                <Card.Content textAlign="center" extra>
                  {MacrosList(goalMacros)}
                </Card.Content>
              </Card>
              <Card raised>
                <Card.Content header="Remaining" textAlign="center" />
                <Card.Content textAlign="center" extra>
                  {MacrosList(remainingMacros)}
                </Card.Content>
              </Card>
            </Card.Group>
          </div>
        )}
    </div>
  );
};

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

export default DietGoal;
