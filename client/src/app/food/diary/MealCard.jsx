import React, { Component } from 'react';
import { Card, List, Button, Transition } from 'semantic-ui-react';
import utils from 'app/food/HomeUtils';
import ManageDiaryFood from 'app/food/diary/ManageDiary.jsx';
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

  findMeal = (mealsArr, part) => {
    return _.find(mealsArr, { part: part });
  };

  renderMeal = (mealsArr, part) => {
    const meal = this.findMeal(mealsArr, part);
    const { _id, products } = meal;
    const macrosPerMeal = utils.macrosPerMeal(meal);
    return (
      <Card key={_id} fluid raised>
        <Card.Content header={part} />
        <Card.Content>{renderProductList(products, _id, this.selectProduct)}</Card.Content>
        <Card.Content extra>{renderSummary(macrosPerMeal, part, _id)}</Card.Content>
      </Card>
    );
  };

  render() {
    const { mealsData } = this.props;
    const labels = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];

    return (
      <div>
        <ManageDiaryFood openModal={this.state.modalOpen} handleModal={this.handleModal} {...this.props} />
        {!_.isEmpty(mealsData) ? (
          <Card.Group>
            {labels.map(label => {
              return this.renderMeal(_.map(mealsData), label);
            })}
          </Card.Group>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const renderProductList = (productsArr = [], mealId, selectOnClick) => {
  return (
    <Transition.Group as={List} duration={700} animation="fade" selection divided>
      {productsArr.filter(product => product.product !== null).map(product => {
        const {
          _id,
          product: { name, brand }
        } = product;

        const { calories, proteins, carbs, fats, grams } = utils.macrosPerProduct(product);
        const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
        return (
          <List.Item
            key={_id}
            onClick={() => {
              selectOnClick(product, mealId);
            }}
          >
            <List.Content content={`(${grams}g)`} floated="right" />
            <List.Content floated="right" verticalAlign="middle" description={header} />
            <List.Icon name="food" size="large" verticalAlign="middle" />
            <List.Content header={{ content: name, as: 'a' }} description={brand} verticalAlign="middle" />
          </List.Item>
        );
      })}
    </Transition.Group>
  );
};

const renderSummary = (macrosPerMeal, mealLabel, mealId) => {
  const renderMacrosPerMeal = macrosPerMeal => {
    const { calories, proteins, carbs, fats } = macrosPerMeal;
    const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
    const style = { paddingRight: '0.5em' };

    return <List.Content floated="right" header={header} style={style} />;
  };

  const renderAddButton = (mealLabel, mealId) => {
    const newRoute2 = {
      pathname: `/food/diary/add/${mealLabel}/${mealId}`
    };
    return <Button content="Add Food" as={Link} to={newRoute2} size="small" secondary compact primary />;
  };
  return (
    <List>
      <List.Item>
        {!_.isEmpty(macrosPerMeal) ? renderMacrosPerMeal(macrosPerMeal) : ''}
        {renderAddButton(mealLabel, mealId)}
      </List.Item>
    </List>
  );
};

// const prueba = macrosPerMeal => {
//   const { calories, proteins, carbs, fats } = macrosPerMeal;
//   return (
//     <Statistic.Group className="prueba2">
//       <Statistic value="KCAL" label={calories} />
//       <Statistic value="P" label={proteins} />
//       <Statistic value="C" label={carbs} />
//       <Statistic value="F" label={fats} />
//     </Statistic.Group>
//   );
// };

export default MealCards;

// {!loading && (
//   <Card.Group centered>

//     {labels.map((label, index) => {
//       let meal = mealsArr.find(meal => meal.part === label);

//       if (isUndefined(meal)) {
//         meal = {};
//       }

//       const { _id, products } = meal;
//       const macrosPerMeal = utils.macrosPerMeal(meal);

//       return (
//         <Card raised fluid key={index}>
//           <Card.Content header={label} />
//           <Card.Content>{renderProductList(products, _id, this.selectProduct)}</Card.Content>
//           <Card.Content extra>{renderSummary(macrosPerMeal, label, _id)}</Card.Content>
//         </Card>
//       );
//     })}
//   </Card.Group>
// )}
