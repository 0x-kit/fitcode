import React, { Component } from 'react';
import { Card, List, Button } from 'semantic-ui-react';
import utils from 'app/food/HomeUtils';
import ManageDiaryFood from 'app/food/diary/ManageDiary.jsx';
import ManageRecipe from 'app/food/diary/add/ManageRecipe.jsx';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const iconStyle = { float: 'left', marginTop: '5px' };
const listContentStyle = { float: 'right', marginLeft: '5px' };
const listHeaderStyle = { marginBottom: '5px' };

const cardHeaderStyle = { display: 'inline', fontSize: '1.21428571rem' };
const cardMetaStyle = { float: 'right', lineHeight: '1.8585em' };
const cardContentStyle = { paddingTop: '0' };
const cardStyle = { marginBottom: '0' };

class MealCards extends Component {
  state = { modalOpenProduct: false, modalOpenRecipe: false };

  selectProduct = (selectedProduct, mealId) => {
    const { product, grams } = selectedProduct;
    this.props.selectProduct(product, grams);
    this.props.selectMeal(mealId);
    this.handleModalProduct(true);
  };

  selectRecipe = (recipe, serving, mealId) => {
   // console.log(recipe, serving);
    this.props.selectRecipe(recipe, serving);
    this.props.selectMeal(mealId);
    this.handleModalRecipe(true);
  };

  handleModalProduct = flag => {
    this.setState({ modalOpenProduct: flag });
  };

  handleModalRecipe = flag => {
    this.setState({ modalOpenRecipe: flag });
  };

  renderMeal = (mealsArr, part) => {
    const meal = _.find(mealsArr, { part: part });
    const { _id, products, recipes } = meal;
    const macrosPerMeal = utils.macrosPerMeal(meal);

    return (
      <Card style={cardStyle} key={_id} fluid raised>
        <Card.Content>
          <Card.Header style={cardHeaderStyle}>{part}</Card.Header>
          <Card.Meta style={cardMetaStyle}>{this.renderActions(part, _id, this.props.match)}</Card.Meta>
        </Card.Content>

        <Card.Content>{this.renderList(products, recipes, _id)}</Card.Content>

        <Card.Content extra style={cardContentStyle}>
          {this.renderMacros(macrosPerMeal)}
        </Card.Content>
      </Card>
    );
  };

  renderRecipeList = (recipesArr = [], mealId) => {
    return recipesArr.filter(recipe => recipe.recipe !== null).map(({ recipe, serving }) => {
      const { name, products } = recipe;
      const macrosPerRecipe = utils.reduceMacros(products, serving);
      console.log(macrosPerRecipe,serving);
      const { calories, proteins, carbs, fats } = macrosPerRecipe;
      const header = `${calories * serving} CAL | ${proteins * serving} P | ${carbs * serving} C | ${fats * serving} F`;
      const headerAs = { content: name, as: 'a' };
      const servingContent = `(x${serving})`;

      return (
        <List.Item
          key={recipe._id}
          onClick={() => {
            this.selectRecipe(recipe, serving, mealId);
          }}
        >
          <List.Icon name="book" style={iconStyle} size="large" />
          <List.Content floated="left" header={headerAs} description={'Recipe'} />
          <List.Content content={servingContent} style={listContentStyle} />
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
      const headerAs = { content: name, as: 'a' };
      const gramsContent = `(${grams}g)`;

      return (
        <List.Item
          key={_id}
          onClick={() => {
            this.selectProduct(product, mealId);
          }}
        >
          <List.Icon name="food" style={iconStyle} size="large" verticalAlign="top" />
          <List.Content floated="left" header={headerAs} description={brand} style={listHeaderStyle} />
          <List.Content content={gramsContent} style={listContentStyle} />
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
      <List divided relaxed selection>
        {!_.isEmpty(recipes) && this.renderRecipeList(recipes, mealId)}
        {!_.isEmpty(products) && this.renderProductList(products, mealId)}
      </List>
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

        <ManageRecipe openModal={this.state.modalOpenRecipe} handleModal={this.handleModalRecipe} {...this.props} />

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
