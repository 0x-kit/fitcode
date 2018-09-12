import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import {
  Card,
  List,
  Header,
  Responsive,
  Container,
  Segment,
  Button,
  Transition
} from "semantic-ui-react";

import ManageRecipeFood from "app/recipe/ManageRecipe.jsx";
import CreateRecipe from "app/recipe/CreateRecipe.jsx";
import utils from "app/food/HomeUtils";

class Recipe extends Component {
  state = { manageModal: false, createModal: false };

  selectProduct = (selectedProduct, recipeId) => {
    const { product, grams } = selectedProduct;
    this.props.selectProduct(product, grams);
    this.props.selectRecipe(recipeId);
    this.handleManageModal(true);
  };

  handleManageModal = flag => this.setState({ manageModal: flag });

  handleCreateModal = flag => this.setState({ createModal: flag });

  renderRecipe = recipe => {
    const { _id, name, products } = recipe;
    const macrosPerRecipe = utils.macrosPerMeal(recipe);

    return (
      <Card key={_id} fluid raised>
        <Card.Content header={name} />
        {!_.isEmpty(products) && (
          <Card.Content>
            {this.renderProductList(products, this.selectProduct, _id)}
          </Card.Content>
        )}
        <Card.Content extra>
          {this.renderSummary(macrosPerRecipe, _id, this.props.match)}
        </Card.Content>
      </Card>
    );
  };

  renderProductList = (productsArr = [], selectProduct, recipeId) => {
    return (
      <Responsive as={List} minWidth={615} selection divided>
        {productsArr
          .filter(product => product.product !== null)
          .map(product => {
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
                  selectProduct(product, recipeId);
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

  renderMacrosPerMeal = macrosPerMeal => {
    const { calories, proteins, carbs, fats } = macrosPerMeal;
    const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
    const style = { paddingRight: "0.5em" };

    return <List.Content floated="right" description={header} style={style} />;
  };
  renderSummary = (macrosPerMeal, recipeId, match) => {
    const renderAddButton = recipeId => {
      const path = {
        pathname: `${match.url}/add/${recipeId}`
      };

      return (
        <List.Content floated="left">
          <Button
            content="Add Food"
            as={Link}
            to={path}
            size="small"
            secondary
            compact
          />
          <Button
            content="Delete Recipe"
            size="small"
            compact
            onClick={() => this.props.complexDeleteRecipe(recipeId)}
          />
        </List.Content>
      );
    };

    return (
      <List>
        <List.Item>
          {renderAddButton(recipeId)}
          {!_.isEmpty(macrosPerMeal)
            ? this.renderMacrosPerMeal(macrosPerMeal)
            : ""}
        </List.Item>
      </List>
    );
  };

  renderMainCard = () => {
    return (
      <Card raised fluid>
        <Card.Content textAlign="center">
          <Header size="medium">Your Personal Recipes</Header>
          <Button
            secondary
            onClick={() => this.handleCreateModal(true)}
            size="small"
            compact
            primary
            content="Create Recipe"
          />
        </Card.Content>
      </Card>
    );
  };

  render() {
    // handleSubmit provided by reduxForm
    const { userRecipes, loading } = this.props;
    const recipeArr = _.map(userRecipes).reverse();

    return (
      <Responsive as={Container}>
        {!loading ? (
          <Segment padded raised>
            <Card.Group centered>
              {this.renderMainCard()}

              {!_.isEmpty(userRecipes) &&
                recipeArr.map(recipe => {
                  return this.renderRecipe(recipe);
                })}
            </Card.Group>
          </Segment>
        ) : (
          <div />
        )}
        <ManageRecipeFood
          openModal={this.state.manageModal}
          handleModal={this.handleManageModal}
          {...this.props}
        />

        <CreateRecipe
          openModal={this.state.createModal}
          handleModal={this.handleCreateModal}
          {...this.props}
        />
      </Responsive>
    );
  }
}

export default Recipe;

let payload = {
  recipe: {
    products: [],
    _id: "5b98da4e96f0b81e6d4e68c9",
    user: "5b6e0b2e5949697d105c0a08",
    name: "DADA",
    __v: 0
  },
  message: "Recipe successfully deleted."
};

let recipes = {
  "5b9624ea9fe6406566cb4da8": {
    products: [
      {
        _id: "5b9624ea9fe6406566cb4da9",
        product: {
          _id: "5b6e055a4ea7837716f46cde",
          name: "Tasty Plastic Car",
          brand: "Cheese",
          calories: 467,
          carbs: 33,
          proteins: 147,
          fats: 74,
          __v: 0,
          user: null
        },
        grams: 53
      },
      {
        _id: "5b97e1914c263f46ff431785",
        product: {
          _id: "5b6e055a4ea7837716f46ce7",
          name: "Refined Cotton Shirt",
          brand: "Pizza",
          calories: 70,
          carbs: 125,
          proteins: 48,
          fats: 78,
          __v: 0,
          user: "5b83f23ee6bd64016c330944"
        },
        grams: 43
      },
      {
        _id: "5b98c064f5f9380e0ae7caa7",
        product: {
          _id: "5b6e055a4ea7837716f46ce2",
          name: "Intelligent Concrete Ball",
          brand: "Computer",
          calories: 465,
          carbs: 144,
          proteins: 113,
          fats: 57,
          __v: 0
        },
        grams: 100
      }
    ],
    _id: "5b9624ea9fe6406566cb4da8",
    user: "5b6e0b2e5949697d105c0a08",
    name: "Desayuno potenteX"
  },
  "5b963db21f4e7d77b104b0d2": {
    products: [
      {
        _id: "5b97e27a4c263f46ff431797",
        product: {
          _id: "5b6e061e7775a677d4648f88",
          name: "Small Fresh Shoes",
          brand: "Pizza",
          calories: 60,
          carbs: 94,
          proteins: 67,
          fats: 53,
          __v: 0
        },
        grams: 300
      }
    ],
    _id: "5b963db21f4e7d77b104b0d2",
    user: "5b6e0b2e5949697d105c0a08",
    name: "Almuerzo ligero"
  },
  "5b98da4e96f0b81e6d4e68c9": {
    _id: "5b98da4e96f0b81e6d4e68c9",
    user: "5b6e0b2e5949697d105c0a08",
    name: "DADA",
    products: [],
    __v: 0
  }
};
let x = [
  {
    products: [],
    _id: "5b98da4e96f0b81e6d4e68c9",
    user: "5b6e0b2e5949697d105c0a08",
    name: "DADA",
    __v: 0
  }
];
//console.log(_.mapKeys(x, "_id"));
const toOmit = _.mapKeys(payload.recipe, "_id");
console.log(toOmit);
const prueba = _.omit(recipes, "5b98da4e96f0b81e6d4e68c9");
console.log(prueba);
