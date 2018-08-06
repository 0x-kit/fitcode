import React, { Component } from 'react';
import { Card, List, Button } from 'semantic-ui-react';
import HomeUtils from 'app/home/HomeUtils';
import { Link } from 'react-router-dom';

class MealCards extends Component {
  render() {
    const { meals, loading, match } = this.props;
    const mealsArr = HomeUtils.mealsToArr(meals);
    return (
      <div>
        {!loading && (
          <Card.Group centered>
            {mealsArr.map((meal, index) => {
              const macrosPerMeal = HomeUtils.macrosPerMeal(
                meal.label,
                mealsArr
              );
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
                                <List.Header>({grams}g)</List.Header>
                              </List.Content>
                              <List.Content
                                floated="right"
                                verticalAlign="middle"
                              >
                                <List.Description floated="right">
                                  {calories} KCAL | {proteins} P | {carbs} C |
                                  {fats} F
                                </List.Description>
                              </List.Content>

                              <List.Icon
                                name="food"
                                size="large"
                                verticalAlign="middle"
                              />

                              <List.Content verticalAlign="middle">
                                <List.Header as="a">{name}</List.Header>
                                <List.Description>{brand}</List.Description>
                              </List.Content>
                            </List.Item>
                          );
                        })}
                    </List>
                  </Card.Content>
                  <Card.Content extra>
                    <List.Item>
                      <Button
                        as={Link}
                        to={{
                          pathname: `${match.path}/new`,
                          search: `?part=${meal.label}&id=${meal._id}`
                        }}
                        size="tiny"
                        compact
                        primary
                      >
                        Add Food
                      </Button>
                      <List.Content floated="right">
                        <List.Description>
                          {macrosPerMeal.calories} KCAL |{' '}
                          {macrosPerMeal.proteins} P | {macrosPerMeal.carbs} C |{' '}
                          {macrosPerMeal.fats} F
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
  }
}

export default MealCards;
