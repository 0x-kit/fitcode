import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import AddFood from 'app/food/diary/add/AddFood.jsx';
import AddRecipe from 'app/food/diary/add/AddRecipe.jsx';
import transform from 'app/common/Transformations';
import { SimpleForm } from 'app/common/Form.jsx';
import { validateText } from 'app/common/Validation.js';
import { Card, List, Header, Container } from 'semantic-ui-react';

const containerStyle = { marginBottom: '2rem' };
const iconStyle = { float: 'left', marginTop: '5px' };
const searchStyle = {
  fontSize: '.82857143em',
  fontWeight: 700,
  color: '#db2828'
};

class SearchFood extends Component {
  fields = [
    {
      name: 'term',
      formInput: { type: 'text', icon: 'search', iconPosition: 'left', placeholder: 'Search...' }
    }
  ];

  state = { modalOpenProduct: false, modalOpenRecipe: false };

  handleModalProduct = flag => this.setState({ modalOpenProduct: flag });
  handleModalRecipe = flag => this.setState({ modalOpenRecipe: flag });

  selectProduct = product => {
    this.props.selectProduct(product, 100);
    this.handleModalProduct(true);
  };

  selectRecipe = recipe => {
    this.props.selectRecipe(recipe);
    this.handleModalRecipe(true);
  };

  onSubmit = values => {
    const { term } = values;
    this.props.complexSearchProducts(term);
  };

  renderProductList = products => (
    <List divided relaxed selection>
      {products.map(product => {
        const { _id, name, brand, calories, proteins, carbs, fats } = product;
        const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
        const listHeaderStyle = { content: name, as: 'a' };
        const listContentStyle = { marginBottom: '5px' };
        return (
          <List.Item onClick={() => this.selectProduct(product)} key={_id}>
            <List.Icon name="food" style={iconStyle} size="large" verticalAlign="top" />
            <List.Content floated="left" header={listHeaderStyle} description={brand} style={listContentStyle} />
            <List.Content floated="right" content={header} />
          </List.Item>
        );
      })}
    </List>
  );

  renderRecipeList = recipes => (
    <List divided relaxed selection>
      {recipes.map(recipe => {
        const { _id, name, products } = recipe;
        const { calories, proteins, carbs, fats } = transform.reduceMacros(products);
        const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
        const listHeaderStyle = { content: name, as: 'a' };
        return (
          <List.Item key={_id} onClick={() => this.selectRecipe(recipe)}>
            <List.Icon name="book" style={iconStyle} size="large" verticalAlign="middle" />
            <List.Content floated="left" header={listHeaderStyle} description="Recipe" />
            <List.Content floated="right" verticalAlign="middle" content={header} />
          </List.Item>
        );
      })}
    </List>
  );

  render() {
    const {
      handleSubmit,
      products,
      userRecipes,
      selectedProduct,
      selectedMeal,
      selectedRecipe,
      searchMessage,
      loading
    } = this.props;

    const { modalOpenProduct, modalOpenRecipe } = this.state;
    const recipes = _.map(userRecipes).reverse();

    return (
      <div>
        {loading ? (
          <div />
        ) : (
          <Container style={containerStyle}>
            <Card raised fluid>
              <Card.Content textAlign="center">
                <Header size="medium">
                  Search our food database by name or brand
                  <Header.Subheader>{selectedMeal.part}</Header.Subheader>
                  <Header.Subheader style={searchStyle}>{searchMessage}</Header.Subheader>
                </Header>
              </Card.Content>

              <Card.Content>
                <SimpleForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
              </Card.Content>
            </Card>

            {products.length !== 0 && (
              <Card raised fluid>
                <Card.Content extra textAlign="center" content="Food" />
                <Card.Content content={this.renderProductList(products)} />
              </Card>
            )}

            {recipes.length !== 0 && (
              <Card raised fluid>
                <Card.Content extra textAlign="center" content="Recipes" />
                <Card.Content content={this.renderRecipeList(recipes)} />
              </Card>
            )}
          </Container>

        )}
        <AddFood
          complexAddDiaryProduct={this.props.complexAddDiaryProduct}
          complexAddRecipeProduct={this.props.complexAddRecipeProduct}
          openModal={modalOpenProduct}
          handleModal={this.handleModalProduct}
          selectedProduct={selectedProduct}
          selectedMeal={selectedMeal}
          selectedRecipe={selectedRecipe}
        />

        <AddRecipe
          complexAddDiaryRecipe={this.props.complexAddDiaryRecipe}
          openModal={modalOpenRecipe}
          handleModal={this.handleModalRecipe}
          selectedMeal={selectedMeal}
          selectedRecipe={selectedRecipe}
        />
      </div>
    );
  }
}
const validate = ({ term }) => ({ ...validateText({ term }) });

export default reduxForm({ validate, form: 'search' })(SearchFood);
