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
  Button
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
      <Responsive as={List} selection divided>
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
      <Segment basic style={{ marginBottom: '0px' }}>
        <Card.Content style={{ textAlign: 'center' }}>
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
      </Segment>
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