import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import AddFood from 'app/food/diary/add/AddFood.jsx';

import { Card, Input, List, Header, Responsive, Container, Segment, Form, Transition } from 'semantic-ui-react';

class SearchFood extends Component {
  state = { modalOpen: false };

  handleModal = flag => {
    this.setState({ modalOpen: flag });
  };

  selectProduct = product => {
    this.props.selectProduct(product, 100);
    this.handleModal(true);
  };

  onSubmit = values => {
    const { term } = values;
    this.props.complexSearchProducts(term);
  };

  renderField = field => {
    const {
      meta: { touched, error }
    } = field;

    let validateError = false;

    if (touched && error) {
      validateError = true;
    }

    return (
      <Form.Field>
        <Input fluid size="medium" icon="search" type="text" placeholder="Search..." {...field.input} />
        {validateError ? (
          <Header as="label" color="red" size="tiny" textAlign="center">
            {error}
          </Header>
        ) : (
          ''
        )}
      </Form.Field>
    );
  };

  renderProductList(products) {
    return (
      <Transition.Group as={List} duration={700} animation="fade" divided relaxed selection>
        {products.map(product => {
          const { _id, name, brand, calories, proteins, carbs, fats } = product;
          const constantDescription = '100g';
          const header = `${calories} KCAL | ${proteins} P | ${carbs} C | ${fats} F`;

          return (
            <List.Item onClick={() => this.selectProduct(product)} key={_id}>
              <List.Content floated="right" content={constantDescription} />
              <List.Content floated="right" verticalAlign="middle" description={header} />
              <List.Icon name="food" size="large" verticalAlign="middle" />
              <List.Content header={{ content: name, as: 'a' }} description={brand} verticalAlign="middle" />
            </List.Item>
          );
        })}
      </Transition.Group>
    );
  }

  render() {
    // handleSubmit provided by reduxForm
    const { handleSubmit, products, selectedProduct, selectedMeal, searchMessage } = this.props;
    const { modalOpen } = this.state;
    const searchStyle = {
      fontSize: '.82857143em',
      fontWeight: 700,
      color: '#db2828'
    };

    return (
      <Responsive as={Container}>
        <Segment padded>
          <Card raised fluid>
            <Card.Content textAlign="center">
              <Header size="medium">
                Search our food database by name or brand
                <Header.Subheader>{selectedMeal.part}</Header.Subheader>
                <Header.Subheader style={searchStyle}>{searchMessage}</Header.Subheader>
              </Header>
            </Card.Content>

            <Card.Content>
              <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Field name="term" component={this.renderField} />
              </Form>
            </Card.Content>
          </Card>
          {products.length !== 0 && (
            <Card raised fluid>
              <Card.Content>{this.renderProductList(products)}</Card.Content>
            </Card>
          )}

          <AddFood
            complexAddDiaryProduct={this.props.complexAddDiaryProduct}
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

const validate = values => {
  const errors = {};
  const required = 'Required field';

  if (!values.term) {
    errors.term = required;
  }

  return errors;
};

export default reduxForm({ validate, form: 'search' })(SearchFood);
