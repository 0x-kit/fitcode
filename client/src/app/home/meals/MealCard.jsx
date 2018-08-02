import React from 'react';
import { Card, List, Button, Segment } from 'semantic-ui-react';
import Home from 'app/common/HomeInfo';

const MealCards = props => {
  const homeInfo = new Home();
  const goal = props.dietGoal.goals.macros;
  const meals = homeInfo.meals(props.mealsData);
  //const remaining = Transform.remaining(meals, goal);

  return (
    <div>
      <Card.Group centered>
        {meals.map((meal, index) => {
          return (
            <Card raised fluid key={meal._id || index}>
              <Card.Content header={meal.label} />
              <Card.Content extra>
                <List divided>
                  {meal.products.map(product => {
                    
                    let calories = 0,
                      proteins = 0,
                      carbs = 0,
                      fats = 0;
                    const {
                      _id,
                      grams,
                      product: { name, brand }
                    } = product;

                    calories = homeInfo.per(product.product.calories, grams);
                    proteins = homeInfo.per(product.product.proteins, grams);
                    carbs = homeInfo.per(product.product.carbs, grams);
                    fats = homeInfo.per(product.product.fats, grams);

                    return (
                      <List.Item key={_id}>
                        <List.Content floated="right">
                          <Button
                            circular
                            size="mini"
                            compact
                            icon="delete"
                            secondary
                          />
                        </List.Content>
                        <List.Icon
                          name="food"
                          size="large"
                          verticalAlign="middle"
                        />
                        <List.Content>
                          <List.Header as="a">
                            {name} [{brand}] - {grams}G
                          </List.Header>
                          <List.Description as="a">
                            {calories} KCAL | {proteins} P | {carbs} C | {fats}{' '}
                            F
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                </List>
              </Card.Content>
              <Card.Content extra>
                <List.Item>
                  <Button size="tiny" compact primary>
                    Add Food
                  </Button>
                  <List.Content floated="right">
                    <List.Description>
                      {' '}
                      300 KCAL | 10 P | 10 C | 10 F
                    </List.Description>
                  </List.Content>
                </List.Item>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </div>
  );
};

export default MealCards;
