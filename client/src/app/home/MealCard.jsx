import React, { Component } from 'react';
import { Card, List, Button } from 'semantic-ui-react';
import HomeUtils from 'app/home/HomeUtils';
import EditProductModal from 'app/home/EditProduct.jsx';
import { Link } from 'react-router-dom';
import _ from 'lodash';

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
        <EditProductModal openModal={this.state.modalOpen} handleModal={this.handleModal} {...this.props} />

        {!loading && (
          <Card.Group centered>
            {labels.map((label, index) => {
              let meal;

              mealsArr.length === 0 ? (meal = {}) : (meal = mealsArr.find(meal => meal.part === label));

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
    <List divided selection>
      {productsArr.map(product => {
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
    </List>
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
      pathname: `${match.path}/new`,
      search: `?part=${mealLabel}&id=${mealId}`
    };
    return (
      <Button as={Link} to={newRoute} size="small" compact primary>
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

export default MealCards;
