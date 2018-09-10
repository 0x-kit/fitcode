import React, { Component } from "react";
import _ from "lodash";
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
import { Link } from "react-router-dom";

import utils from "app/food/HomeUtils";

class Recipe extends Component {
  state = { manageModal: false, createModal: false };

  handleManageModal = flag => this.setState({ manageModal: flag });

  handleCreateModal = flag => this.setState({ createModal: flag });

  selectExercise = exercise => {
    this.props.selectExercise(exercise);
    this.handleManageModal(true);
  };

  selectProduct = product => {
    console.log("product");
  };

  renderRecipe = recipe => {
    const { _id, name, products } = recipe;
    const macrosPerRecipe = utils.macrosPerMeal(recipe);

    return (
      <Card key={_id} fluid raised>
        <Card.Content header={name} />
        <Card.Content>{this.renderProductList(products)}</Card.Content>
        <Card.Content extra>
          {this.renderSummary(macrosPerRecipe, name, _id, this.props.match)}
        </Card.Content>
      </Card>
    );
  };

  renderProductList = (productsArr = []) => {
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
              <List.Item key={_id}>
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
  renderSummary = (macrosPerMeal, recipeName, recipeId, match) => {
    const renderAddButton = (recipeName, recipeId) => {
      const path = {
        pathname: `${match.url}/add/${recipeId}`
      };

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
          <Button
            content="Delete Recipe"
            // onClick={() => selectMeal({ mealId, mealLabel })}
            size="small"
            compact
          />
        </List.Content>
      );
    };

    return (
      <List>
        <List.Item>
          {renderAddButton(recipeName, recipeId)}
          {!_.isEmpty(macrosPerMeal)
            ? this.renderMacrosPerMeal(macrosPerMeal)
            : ""}
        </List.Item>
      </List>
    );
  };

  render() {
    // handleSubmit provided by reduxForm
    const { userRecipes, loading } = this.props;
    const style = { paddingRight: "0.5em" };
    const headerStyle = { marginTop: "0.5em" };

    const recipeArr = _.map(userRecipes);

    return (
      <Responsive as={Container}>
        <Segment raised>
          {!_.isEmpty(userRecipes) ? (
            <Card.Group centered>
              <Header as="h3" style={headerStyle}>
                Your recipes
              </Header>
              {recipeArr.map(recipe => {
                return this.renderRecipe(recipe);
              })}
            </Card.Group>
          ) : (
            <div />
          )}

          {/* <ManageExercise
            openModal={manageModal}
            handleModal={this.handleManageModal}
            selectedExercise={selectedExercise}
            {...this.props}
          />

          <CreateExercise openModal={createModal} handleModal={this.handleCreateModal} {...this.props} /> */}
        </Segment>
      </Responsive>
    );
  }
}

export default Recipe;
