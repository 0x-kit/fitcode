import React, { Component } from 'react';
import { Card, List, Button, Transition, Statistic, Segment, Grid } from 'semantic-ui-react';
import HomeUtils from 'app/food/HomeUtils';
import ManageDiaryFood from 'app/food/diary/ManageDiary.jsx';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { isUndefined } from 'util';

class MealCards extends Component {
  state = { modalOpen: false };

  selectProduct = (selectedProduct, mealId) => {
    const { product, grams } = selectedProduct;

    this.props.selectProduct(product, grams);
    this.props.selectMeal(mealId);
    this.handleModal(true);
  };

  handleModal = flag => {
    this.setState({ modalOpen: flag });
  };

  render() {
    const { mealsData, loading, match } = this.props;
    const labels = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];
    const mealsArr = HomeUtils.mealsToArr(mealsData);

    return (
      <div>
        <ManageDiaryFood openModal={this.state.modalOpen} handleModal={this.handleModal} {...this.props} />

        {!loading && (
          <Card.Group centered>
            {labels.map((label, index) => {
              let meal = mealsArr.find(meal => meal.part === label);

              if (isUndefined(meal)) meal = {};

              const { _id, products } = meal;
              const macrosPerMeal = HomeUtils.macrosPerMeal(meal);

              return (
                <Card raised fluid key={index}>
                  <Card.Content header={label} />
                  <Card.Content>{mealProductList(products, _id, this.selectProduct)}</Card.Content>
                  <Card.Content extra>{mealSummaryList(macrosPerMeal, match, label, _id)}</Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        )}
      </div>
    );
  }
}

const mealProductList = (productsArr = [], mealId, selectProduct) => {
  return (
    <Transition.Group as={List} duration={700} animation="fade" selection divided>
      {productsArr.filter(product => product.product !== null).map(product => {
        const {
          _id,
          product: { name, brand }
        } = product;

        const { calories, proteins, carbs, fats, grams } = HomeUtils.macrosPerProduct(product);
        return (
          <List.Item
            key={_id}
            onClick={() => {
              selectProduct(product, mealId);
            }}
          >
            <List.Content header={'(' + grams + 'g)'} floated="right" />

            <List.Content
              floated="right"
              verticalAlign="middle"
              description={calories + ' KCAL | ' + proteins + ' P | ' + carbs + ' C | ' + fats + ' F'}
            />
            <List.Icon name="food" size="large" verticalAlign="middle" />

            <List.Content header={{ content: name, as: 'a' }} description={brand} verticalAlign="middle" />
          </List.Item>
        );
      })}
    </Transition.Group>
  );
};

const mealSummaryList = (macrosPerMeal, match, mealLabel, mealId) => {
  /*** */
  const renderMacrosPerMeal = macrosPerMeal => {
    return (
      <List.Content floated="right">
        <List.Description>
          {macrosPerMeal.calories} KCAL | {macrosPerMeal.proteins} P | {macrosPerMeal.carbs} C | {macrosPerMeal.fats} F
        </List.Description>
      </List.Content>
    );
  };
  /*** */
  const renderAddButton = (match, mealLabel, mealId) => {
    const newRoute = {
      pathname: `${match.path}/add`,
      search: `?meal=${mealLabel}&id=${mealId}`
    };
    return (
      <Button secondary as={Link} to={newRoute} size="small" compact primary>
        Add Food
      </Button>
    );
  };
  /*** */
  return (
    <List>
      <List.Item>
        {_.isEmpty(macrosPerMeal) ? '' : renderMacrosPerMeal(macrosPerMeal)}
        {renderAddButton(match, mealLabel, mealId)}
      </List.Item>
    </List>
  );
};

const prueba = (calories, proteins, carbs, fats) => {
  return (
    <Statistic.Group className="prueba2">
      <Statistic value="KCAL" label={calories} />
      <Statistic value="P" label={proteins} />
      <Statistic value="C" label={carbs} />
      <Statistic value="F" label={fats} />
    </Statistic.Group>
  );
};

export default MealCards;
