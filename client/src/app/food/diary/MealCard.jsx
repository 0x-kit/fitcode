import React, { Component } from "react";

import { Card, List, Button, Transition, Responsive } from "semantic-ui-react";
import utils from "app/food/HomeUtils";
import ManageDiaryFood from "app/food/diary/ManageDiary.jsx";
import { Link } from "react-router-dom";
import _ from "lodash";

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
        {!_.isEmpty(products) && (
          <Card.Content>
            {renderProductList(products, this.selectProduct, _id)}
            {renderProductList2(products, this.selectProduct, _id)}
          </Card.Content>
        )}
        <Card.Content extra>
          {renderSummary(macrosPerMeal, part, _id, this.props.match)}
        </Card.Content>
      </Card>
    );
  };

  render() {
    const { mealsData } = this.props;
    const labels = ["Breakfast", "Lunch", "Snacks", "Dinner", "Others"];
    return (
      <div>
        <ManageDiaryFood
          openModal={this.state.modalOpen}
          handleModal={this.handleModal}
          {...this.props}
        />
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

const renderProductList = (productsArr = [], selectProduct, mealId) => {
  return (
    <Responsive as={List} minWidth={615} selection divided>
      {productsArr.filter(product => product.product !== null).map(product => {
        const {
          _id,
          product: { name, brand }
        } = product;

        const {
          calories,
          proteins,
          carbs,
          fats,
          grams
        } = utils.macrosPerProduct(product);
        const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;

        return (
          <List.Item
            key={_id}
            onClick={() => {
              selectProduct(product, mealId);
            }}
          >
            <List.Icon
              name="food"
              style={{ float: "left" }}
              size="large"
              verticalAlign="top"
            />

            <List.Content
              floated="left"
              header={{ content: name, as: "a" }}
              description={brand}
            />

            <List.Content content={`(${grams}g)`} floated="right" />
            <List.Content floated="right" description={header} />
          </List.Item>
        );
      })}
    </Responsive>
  );
};

const renderProductList2 = (productsArr = [], selectProduct, mealId) => {
  return (
    <Responsive as={List} minWidth={320} maxWidth={614} selection divided>
      {productsArr.filter(product => product.product !== null).map(product => {
        const {
          _id,
          product: { name, brand }
        } = product;

        const {
          calories,
          proteins,
          carbs,
          fats,
          grams
        } = utils.macrosPerProduct(product);
        const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;

        return (
          <List.Item
            key={_id}
            onClick={() => {
              selectProduct(product, mealId);
            }}
          >
            <List.Icon
              name="food"
              style={{ float: "left" }}
              size="large"
              verticalAlign="top"
            />

            <List.Content
              floated="left"
              header={{ content: name, as: "a" }}
              description={brand}
            />

            <List.Content content={`(${grams}g)`} floated="right" />
            <List.Content
              floated="left"
              description={header}
              className="mobContent"
            />
          </List.Item>
        );
      })}
    </Responsive>
  );
};

const renderSummary = (macrosPerMeal, mealLabel, mealId, match) => {
  const renderMacrosPerMeal = macrosPerMeal => {
    const { calories, proteins, carbs, fats } = macrosPerMeal;
    const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
    const style = { paddingRight: "0.5em" };

    return <List.Content floated="right" description={header} style={style} />;
  };

  const renderAddButton = (mealLabel, mealId) => {
    let path;
    if (!_.isUndefined(match.params.date)) {
      path = {
        pathname: `${match.url}/add/${mealLabel}/${mealId}`
      };
    } else {
      path = {
        pathname: `/food/diary/add/${mealLabel}/${mealId}`
      };
    }

    return (
      <List.Content floated="left">
        <Button
          content="Add Food"
          as={Link}
          to={path}
          // onClick={() => selectMeal({ mealId, mealLabel })}
          size="small"
          secondary
          compact
          primary
        />
      </List.Content>
    );
  };

  return (
    <List>
      <List.Item>
        {renderAddButton(mealLabel, mealId)}
        {!_.isEmpty(macrosPerMeal) ? renderMacrosPerMeal(macrosPerMeal) : ""}
      </List.Item>
    </List>
  );
};
export default MealCards;

{
  /* <Responsive
as={List.Item}
minWidth={320}
maxWidth={569}
key={_id}
onClick={() => {
  selectProduct(product, mealId);
}}
>
<List.Icon name="food" style={{ float: 'left' }} size="large" verticalAlign="top" />

<List.Content floated="left" header={{ content: name, as: 'a' }} description={brand} />

<List.Content content={`(${grams}g)`} floated="right" />
<List.Content floated="right" description={header} />
</Responsive> */
}
