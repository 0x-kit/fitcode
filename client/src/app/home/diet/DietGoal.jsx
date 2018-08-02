import React from 'react';
import { Card, List } from 'semantic-ui-react';
import Home from 'app/common/HomeInfo';

const DietGoal = props => {
  const homeInfo = new Home();
  const { mealsData } = props;
  const goal = props.dietGoal.goals.macros;
  //const { mealsData } = props;
  const meals = homeInfo.meals(mealsData);
  const remaining = homeInfo.remaining(meals, goal);
  return (
    <Card.Group stackable itemsPerRow="2" centered>
      <Card raised>
        <Card.Content header="Goal" textAlign="center" />
        <Card.Content textAlign="center" extra>
          {MacrosList(goal)}
        </Card.Content>
      </Card>
      <Card raised>
        <Card.Content header="Remaining" textAlign="center" />
        <Card.Content textAlign="center" extra>
          {MacrosList(remaining)}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

const MacrosList = macros => {
  const labels = ['Calories', 'Proteins', 'Carbs', 'Fats'];
  return (
    <List size="large" divided horizontal>
      {labels.map((label, index) => {
        return (
          <List.Item as="a" key={index}>
            <List.Content verticalAlign="middle">
              <List.Header>{label}</List.Header>
              <List.Description>
                {macros[label.toLocaleLowerCase()]}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default DietGoal;
