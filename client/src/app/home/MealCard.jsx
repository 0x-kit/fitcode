import React from 'react';
import { Card, List, Button } from 'semantic-ui-react';
import HomeUtils from 'app/home/HomeUtils';

const MealCards = props => {
  const { meals, loading } = props;
  const mealsArr = HomeUtils.mealsToArr(meals);

  return (
    <div>
      {!loading && (
        <Card.Group centered>
          {mealsArr.map((meal, index) => {
            const macrosPerMeal = HomeUtils.macrosPerMeal(meal.label, mealsArr);
            return (
              <Card raised fluid key={meal._id || index}>
                <Card.Content header={meal.label} />
                <Card.Content extra>
                  <List divided>
                    {meal.products !== undefined &&
                      meal.products.map(product => {
                        const {
                          calories,
                          proteins,
                          carbs,
                          fats
                        } = HomeUtils.macrosPerProduct(product);
                        const {
                          _id,
                          grams,
                          product: { name, brand }
                        } = product;

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
                                {calories} KCAL | {proteins} P | {carbs} C |{' '}
                                {fats} F
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
                        {macrosPerMeal.calories} KCAL | {macrosPerMeal.proteins}{' '}
                        P | {macrosPerMeal.carbs} C | {macrosPerMeal.fats} F
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      )}
    </div>
  );
};

export default MealCards;
