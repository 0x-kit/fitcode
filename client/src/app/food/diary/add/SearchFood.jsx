import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import queryString from 'query-string';
import AddFood from 'app/food/diary/add/AddFood.jsx';

import { Card, Input, List, Header, Responsive, Container, Segment, Form } from 'semantic-ui-react';

class SearchFood extends Component {
  state = { modalOpen: false };

  handleModal = flag => {
    this.setState({ modalOpen: flag });
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    if (params.id) {
      this.props.selectMeal(params.id, params.part);
    }
  }

  selectProduct = product => {
    this.props.selectProduct(product, 100);
    this.handleModal(true);
  };

  onSubmit = values => {
    const { term } = values;

    this.props.complexSearchProducts(term);
  };

  renderField = field => {
    return <Input fluid size="medium" icon="search" type="text" placeholder="Search..." {...field.input} />;
  };

  renderProductList(products) {
    return (
      <List divided relaxed selection>
        {products.map(product => {
          const { _id, name, brand, calories, proteins, carbs, fats } = product;
          return (
            <List.Item onClick={() => this.selectProduct(product)} key={_id}>
              <List.Content floated="right">
                <List.Header>(100g)</List.Header>
              </List.Content>
              <List.Content floated="right" verticalAlign="middle">
                <List.Description floated="right">
                  {calories} KCAL | {proteins} P | {carbs} C |{fats} F
                </List.Description>
              </List.Content>

              <List.Icon name="food" size="large" verticalAlign="middle" />

              <List.Content verticalAlign="middle">
                <List.Header as="a">{name}</List.Header>
                <List.Description>{brand}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  }

  render() {
    // handleSubmit provided by reduxForm
    const { handleSubmit, products, selectedProduct, selectedMeal } = this.props;
    const { modalOpen } = this.state;
    const found = products.length;

    return (
      <Responsive as={Container}>
        <Segment padded>
          <Card raised fluid>
            <Card.Content textAlign="center">
              <Header size="medium">
                Search for a food
                <Header.Subheader>{selectedMeal.part}</Header.Subheader>
              </Header>
            </Card.Content>
            <Card.Content>
              <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Field name="term" component={this.renderField} />
              </Form>
            </Card.Content>
            <Card.Content>{this.renderProductList(products)}</Card.Content>
            <Card.Content extra>{found} products found</Card.Content>
          </Card>

          <AddFood
            complexAddProducts={this.props.complexAddProducts}
            openModal={modalOpen}
            handleModal={this.handleModal}
            selectedProduct={selectedProduct}
            selectedMeal={selectedMeal}
          />
        </Segment>
      </Responsive>
    );
  }
}
export default reduxForm({ form: 'search' })(SearchFood);
