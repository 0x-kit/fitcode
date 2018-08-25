import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field, reset, formValueSelector } from 'redux-form';
import { Header, Modal, Input, Statistic, Form, Button, Card } from 'semantic-ui-react';

import HomeUtils from 'app/food/HomeUtils';

class AddFood extends Component {
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('addProduct'));
  };

  onSubmit = values => {
    const { selectedProduct, selectedMeal } = this.props;

    const newProduct = {
      product: selectedProduct._id,
      grams: values.serving
    };

    this.handleClose();
    this.props.complexAddDiaryProduct(selectedMeal.mealId, newProduct, selectedProduct.user);
  };

  renderMacros = (product, serving) => {
    const { calories, proteins, carbs, fats } = product;

    return (
      <Card.Group centered>
        <Statistic.Group className="prueba">
          <Statistic
            value="Calories"
            label={isNaN(HomeUtils.per(calories, serving)) ? '' : HomeUtils.per(calories, serving)}
          />
          <Statistic
            value="Proteins"
            label={isNaN(HomeUtils.per(proteins, serving)) ? '' : HomeUtils.per(proteins, serving)}
          />
          <Statistic value="Carbs" label={isNaN(HomeUtils.per(carbs, serving)) ? '' : HomeUtils.per(carbs, serving)} />
          <Statistic value="Fats" label={isNaN(HomeUtils.per(fats, serving)) ? '' : HomeUtils.per(fats, serving)} />
        </Statistic.Group>
      </Card.Group>
    );
  };
  renderField = field => {
    const {
      placeholder,
      label,
      labelPosition,
      maxLength,
      type,
      meta: { touched, error }
    } = field;

    let validateError = false;

    if (touched && error) {
      validateError = true;
    }
    return (
      <Form.Field>
        <Input
          fluid
          label={label}
          labelPosition={labelPosition}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          {...field.input}
        />
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

  render() {
    const { selectedProduct, serving, handleSubmit, openModal } = this.props;
    const buttonStyle = { marginBottom: 10, width: 272 };
    const modalStyle = { width: 300, textAlign: 'center' };

    return (
      <Modal style={modalStyle} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader={selectedProduct.name} content="Add Food" />
        <Modal.Content>{this.renderMacros(selectedProduct, serving)}</Modal.Content>
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="serving"
              component={this.renderField}
              label={{ basic: true, content: 'g' }}
              labelPosition="right"
              placeholder="Enter weight..."
              type="text"
              maxLength="7"
            />

            <Button style={buttonStyle} size="small" compact secondary content="Add" floated="right" />
          </Form>
        </Modal.Actions>
      </Modal>
    );
  }
}
const validate = values => {
  const errors = {};
  const required = 'Required field';
  const numbers = 'This field can only contain numbers';

  if (!values.serving) {
    errors.serving = required;
  } else if (isNaN(values.serving)) {
    errors.serving = numbers;
  }
  return errors;
};

// Selector needed in order to access the value of the 'serving' field of the addProduct form
// This way we can update in real time the macros depending upon serving size
const selector = formValueSelector('addProduct');

export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedGrams
    }
  })),
  reduxForm({ validate, form: 'addProduct', enableReinitialize: true }),
  connect(state => ({
    serving: selector(state, 'serving')
  }))
)(AddFood);
