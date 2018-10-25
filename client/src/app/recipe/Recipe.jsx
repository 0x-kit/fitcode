import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Card, List, Header, Responsive, Container, Segment, Button } from 'semantic-ui-react';

import ManageRecipeFood from 'app/recipe/ManageRecipe.jsx';
import CreateRecipe from 'app/recipe/CreateRecipe.jsx';
import utils from 'app/food/HomeUtils';

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
    const cardHeaderStyle = { display: 'inline', fontSize: '1.21428571rem' };
    return (
      <Card style={{ marginBottom: '0' }} key={_id} fluid raised>
        <Card.Content>
          <Card.Header style={cardHeaderStyle}>{name}</Card.Header>
          <Card.Meta style={{ float: 'right' }}>{this.renderAddButton(_id, this.props.match)}</Card.Meta>
        </Card.Content>
        {!_.isEmpty(products) && (
          <Card.Content>{this.renderProductList(products, this.selectProduct, _id)}</Card.Content>
        )}
        <Card.Content extra>{this.renderMacrosAndDelete(macrosPerRecipe, _id)}</Card.Content>
      </Card>
    );
  };

  renderProductList = (productsArr = [], selectProduct, recipeId) => {
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
                selectProduct(product, recipeId);
              }}
            >
              <List.Icon name="food" style={{ float: 'left', marginTop: '5px' }} size="large" verticalAlign="top" />

              <List.Content
                floated="left"
                header={{ content: name, as: 'a' }}
                description={brand}
                style={{ margin: '0' }}
              />

              <List.Content content={`(${grams}g)`} style={{ float: 'right', marginLeft: '0', marginRight: '0' }} />
              <List.Content floated="right" content={header} />
            </List.Item>
          );
        })}
      </Responsive>
    );
  };

  renderMacrosAndDelete = (macrosPerMeal, recipeId) => {
    const renderMacrosPerMeal = macrosPerMeal => {
      let header;
      const { calories, proteins, carbs, fats } = macrosPerMeal;

      if ((calories && proteins && carbs && fats) === 0) {
        header = '';
      } else {
        header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
      }

      const style = { paddingTop: '0.3em', float: 'right' };

      return <List.Content description={header} style={style} verticalAlign="middle" />;
    };

    return (
      <List>
        <List.Item>
          <Button
            icon={{ name: 'delete' }}
            basic
            size="small"
            compact
            onClick={() => this.props.complexDeleteRecipe(recipeId)}
          />
          {!_.isEmpty(macrosPerMeal) ? renderMacrosPerMeal(macrosPerMeal) : ''}
        </List.Item>
      </List>
    );
  };

  renderAddButton = (recipeId, match) => {
    const path = {
      pathname: `${match.url}/add/${recipeId}`
    };

    return (
      <List>
        <List.Item>
          <List.Content>
            <Button content="Add Food" as={Link} to={path} size="small" secondary compact />
          </List.Content>
        </List.Item>
      </List>
    );
  };

  renderMainCard = () => {
    const headerStyle = { fontSize: '1.21428571rem' };
    return (
      <Segment basic style={{ marginBottom: '0px' }}>
        <Card.Content style={{ textAlign: 'center' }}>
          <Header size="medium" style={headerStyle}>
            Your Personal Recipes
          </Header>
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
      <Container>
        {!loading ? (
          <Card.Group centered>
            {this.renderMainCard()}

            {!_.isEmpty(userRecipes) &&
              recipeArr.map(recipe => {
                return this.renderRecipe(recipe);
              })}
          </Card.Group>
        ) : (
          <div />
        )}
        <ManageRecipeFood openModal={this.state.manageModal} handleModal={this.handleManageModal} {...this.props} />

        <CreateRecipe openModal={this.state.createModal} handleModal={this.handleCreateModal} {...this.props} />
      </Container>
    );
  }
}

export default Recipe;
