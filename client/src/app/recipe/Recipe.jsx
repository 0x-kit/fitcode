import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Card, List, Header, Container, Segment, Button } from 'semantic-ui-react';
import ManageRecipeFood from 'app/recipe/ManageRecipe.jsx';
import CreateRecipe from 'app/recipe/CreateRecipe.jsx';
import transform from 'app/common/Transformations';

const containerStyle = { marginBottom: '2rem' };

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
    const macrosPerRecipe = transform.reduceMacros(products);
    const cardStyle = { marginBottom: '0' };
    const cardHeaderStyle = { display: 'inline', fontSize: '1.21428571rem' };
    const cardMetaStyle = { float: 'right' };

    return (
      <Card style={cardStyle} key={_id} fluid raised>
        <Card.Content>
          <Card.Header style={cardHeaderStyle} content={name} />
          <Card.Meta style={cardMetaStyle} content={this.renderAddButton(_id, this.props.match)} />
        </Card.Content>
        {!_.isEmpty(products) && <Card.Content content={this.renderProductList(products, this.selectProduct, _id)} />}
        <Card.Content extra content={this.renderMacrosAndDelete(macrosPerRecipe, _id)} />
      </Card>
    );
  };

  renderProductList = (productsArr = [], selectProduct, recipeId) => {
    return (
      <List selection divided>
        {productsArr.filter(product => product.product !== null).map(product => {
          const {
            _id,
            product: { name, brand }
          } = product;

          const { calories, proteins, carbs, fats, grams } = transform.macrosPerProduct(product);
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
      </List>
    );
  };

  renderMacrosAndDelete = (macrosPerMeal, recipeId) => {
    const renderMacrosPerMeal = ({ calories, proteins, carbs, fats }) => {
      const listContentStyle = { paddingTop: '0.3em', float: 'right' };
      const header =
        (calories && proteins && carbs && fats) === 0 ? '' : `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;

      return <List.Content description={header} style={listContentStyle} verticalAlign="middle" />;
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
    const segmentStyle = { marginBottom: '0px' };
    const cardStyle = { textAlign: 'center' };
    return (
      <Segment basic style={segmentStyle}>
        <Card.Content style={cardStyle}>
          <Header size="medium" style={headerStyle} content="Your Personal Recipes" />
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
    const { userRecipes, loading } = this.props;
    const recipes = _.map(userRecipes).reverse();

    return (
      <Container style={containerStyle}>
        {!loading ? (
          <Card.Group centered>
            {this.renderMainCard()}
            {!_.isEmpty(userRecipes) && recipes.map(recipe => this.renderRecipe(recipe))}
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
