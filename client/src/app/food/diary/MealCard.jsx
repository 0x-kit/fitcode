import React, { Component } from 'react';
import { Card, List, Button, Responsive } from 'semantic-ui-react';
import utils from 'app/food/HomeUtils';
import ManageDiaryFood from 'app/food/diary/ManageDiary.jsx';
import ManageRecipe from 'app/food/diary/add/ManageRecipe.jsx';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class MealCards extends Component {
  state = { modalOpenProduct: false, modalOpenRecipe: false };

  selectProduct = (selectedProduct, mealId) => {
    const { product, grams } = selectedProduct;
    this.props.selectProduct(product, grams);
    this.props.selectMeal(mealId);
    this.handleModalProduct(true);
  };

  selectRecipe = (recipe, mealId) => {
    this.props.selectRecipe(recipe.recipe, recipe.serving);
    this.props.selectMeal(mealId);
    this.handleModalRecipe(true);
  };

  handleModalProduct = flag => {
    this.setState({ modalOpenProduct: flag });
  };

  handleModalRecipe = flag => {
    this.setState({ modalOpenRecipe: flag });
  };

  findMeal = (mealsArr, part) => {
    return _.find(mealsArr, { part: part });
  };

  renderMeal = (mealsArr, part) => {
    const meal = this.findMeal(mealsArr, part);
    const { _id, products, recipes } = meal;
    const macrosPerMeal = utils.macrosPerMeal(meal);

    return (
      <Card key={_id} fluid raised>
        <Card.Content header={part} />
        {!_.isEmpty(recipes) && <Card.Content>{renderRecipeList(recipes, this.selectRecipe, _id)}</Card.Content>}

        {!_.isEmpty(products) && <Card.Content>{renderProductList(products, this.selectProduct, _id)}</Card.Content>}

        <Card.Content extra>{renderSummary(macrosPerMeal, part, _id, this.props.match)}</Card.Content>
      </Card>
    );
  };

  render() {
    const { mealsData } = this.props;
    const labels = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];
    //console.log(this.props.selectedRecipe)
    return (
      <div>
        <ManageDiaryFood
          openModal={this.state.modalOpenProduct}
          handleModal={this.handleModalProduct}
          {...this.props}
        />

        <ManageRecipe
          complexDeleteDiaryRecipe={this.props.complexDeleteDiaryRecipe}
          complexEditDiaryRecipe={this.props.complexEditDiaryRecipe}
          openModal={this.state.modalOpenRecipe}
          handleModal={this.handleModalRecipe}
          selectedMeal={this.props.selectedMeal}
          selectedRecipe={this.props.selectedRecipe}
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
const renderRecipeList = (recipesArr = [], selectRecipe, mealId) => {
  return (
    <Responsive as={List} selection divided>
      {recipesArr.filter(recipe => recipe.recipe !== null).map(recipe => {
        const { serving } = recipe;
        const { name } = recipe.recipe;
        const macrosPerRecipe = utils.macrosPerRecipe(recipe.recipe);

        const { calories, proteins, carbs, fats } = macrosPerRecipe;
        const header = `${calories * serving} CAL | ${proteins * serving} P | ${carbs * serving} C | ${fats *
          serving} F`;

        return (
          <List.Item
            key={recipe._id}
            onClick={() => {
              selectRecipe(recipe, mealId);
            }}
          >
            <List.Icon name="food" style={{ float: 'left' }} size="large" verticalAlign="top" />

            <List.Content floated="left" header={{ content: name, as: 'a' }} />
            <List.Content content={`(${serving})`} floated="right" />
            <List.Content floated="right" description={header} />
          </List.Item>
        );
      })}
    </Responsive>
  );
};
const renderProductList = (productsArr = [], selectProduct, mealId) => {
  return (
    <Responsive as={List} selection divided>
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
              selectProduct(product, mealId);
            }}
          >
            <List.Icon name="food" style={{ float: 'left' }} size="large" verticalAlign="top" />

            <List.Content floated="left" header={{ content: name, as: 'a' }} description={brand} />

            <List.Content content={`(${grams}g)`} floated="right" />
            <List.Content floated="right" description={header} />
          </List.Item>
        );
      })}
    </Responsive>
  );
};

const renderSummary = (macrosPerMeal, mealLabel, mealId, match) => {
  const renderMacrosPerMeal = macrosPerMeal => {
    let header;
    const { calories, proteins, carbs, fats } = macrosPerMeal;

    if ((calories && proteins && carbs && fats) === 0) {
      header = '';
    } else {
      header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
    }

    const style = { paddingRight: '0.5em' };

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
        <Button content="Add Food" as={Link} to={path} size="small" secondary compact primary />
      </List.Content>
    );
  };

  return (
    <List>
      <List.Item>
        {renderAddButton(mealLabel, mealId)}
        {!_.isEmpty(macrosPerMeal) ? renderMacrosPerMeal(macrosPerMeal) : ''}
      </List.Item>
    </List>
  );
};
export default MealCards;
