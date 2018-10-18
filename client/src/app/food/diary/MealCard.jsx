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
        <Card.Content>
          <Card.Header style={{ display: 'inline' }}>{part}</Card.Header>
          <Card.Meta style={{ float: 'right', lineHeight: '1.8585em' }}>
            {this.renderActions(part, _id, this.props.match)}
          </Card.Meta>
        </Card.Content>

        <Card.Content>{this.renderList(products, recipes, _id)}</Card.Content>

        <Card.Content extra style={{ paddingTop: '0' }}>
          {this.renderMacros(macrosPerMeal)}
        </Card.Content>
      </Card>
    );
  };

  renderRecipeList = (recipesArr = [], mealId) => {
    return recipesArr.filter(recipe => recipe.recipe !== null).map(recipe => {
      const { serving } = recipe;
      const { name } = recipe.recipe;

      const macrosPerRecipe = utils.macrosPerRecipe(recipe.recipe, serving);
      const { calories, proteins, carbs, fats } = macrosPerRecipe;
      const header = `${calories * serving} CAL | ${proteins * serving} P | ${carbs * serving} C | ${fats * serving} F`;

      return (
        <List.Item
          key={recipe._id}
          onClick={() => {
            this.selectRecipe(recipe, mealId);
          }}
        >
          <List.Icon name="book" style={{ float: 'left', marginTop: '5px' }} size="large" verticalAlign="top" />

          <List.Content floated="left" header={{ content: name, as: 'a' }} description={'Recipe'} />

          <List.Content content={`(x${serving})`} style={{ float: 'right', marginLeft: '5px' }} />
          <List.Content floated="right" content={header} />
        </List.Item>
      );
    });
  };

  renderProductList = (productsArr = [], mealId) => {
    return productsArr.filter(product => product.product !== null).map(product => {
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
            this.selectProduct(product, mealId);
          }}
        >
          <List.Icon name="food" style={{ float: 'left', marginTop: '5px' }} size="large" verticalAlign="top" />

          <List.Content
            floated="left"
            header={{ content: name, as: 'a' }}
            description={brand}
            style={{ marginBottom: '5px' }}
          />

          <List.Content content={`(${grams}g)`} style={{ float: 'right', marginLeft: '5px' }} />
          <List.Content floated="right" content={header} />
        </List.Item>
      );
    });
  };

  renderMacros = macrosPerMeal => {
    const renderMacrosPerMeal = macrosPerMeal => {
      let header;
      const { calories, proteins, carbs, fats } = macrosPerMeal;

      if ((calories && proteins && carbs && fats) === 0) {
        header = '';
      } else {
        header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
      }

      const style = { paddingTop: '0.5em', float: 'right' };

      return <List.Content description={header} style={style} verticalAlign="middle" />;
    };

    return (
      <List>
        <List.Item>{!_.isEmpty(macrosPerMeal) ? renderMacrosPerMeal(macrosPerMeal) : ''}</List.Item>
      </List>
    );
  };

  renderActions = (mealLabel, mealId, match) => {
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

  renderList = (products, recipes, mealId) => {
    return (
      <Responsive as={List} selection divided>
        {!_.isEmpty(recipes) && this.renderRecipeList(recipes, mealId)}
        {!_.isEmpty(products) && this.renderProductList(products, mealId)}
      </Responsive>
    );
  };

  render() {
    const { mealsData } = this.props;
    const labels = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];
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

export default MealCards;
