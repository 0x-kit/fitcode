import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field, reset } from 'redux-form';
import { Header, Modal, Input, Form, Button } from 'semantic-ui-react';

class ManageFood extends Component {
  state = { deleteProduct: false };

  handleDelete = flag => this.setState({ deleteProduct: flag });

  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('manageFood'));
  };

  onSubmit = values => {
    const { selectedProduct } = this.props;

    const { name, brand, calories, proteins, carbs, fats } = values;

    let newProduct = {
      name,
      brand,
      calories,
      proteins,
      carbs,
      fats
    };

    if (this.state.deleteProduct === false) {
      this.props.complexEditPersonalProduct(selectedProduct._id, newProduct);
    } else {
      newProduct.user = null;
      this.props.complexDeletePersonalProduct(selectedProduct._id, newProduct);
    }

    this.handleClose();
  };

  renderField = field => {
    const {
      placeholder,
      label,
      labelPosition,
      maxLength,
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
          type="text"
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
    const { handleSubmit, openModal } = this.props;
    const buttonStyle = { width: 155, marginBottom: 10, marginTop: 10 };
    return (
      <Modal style={{ width: 350, textAlign: 'center' }} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader="Enter the nutritional info " content="Edit Your Food" />
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="name"
              component={this.renderField}
              label={{ basic: true, content: 'Name', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter name..."
            />
            <Field
              name="brand"
              component={this.renderField}
              label={{ basic: true, content: 'Brand', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter brand..."
            />

            <Field
              name="calories"
              component={this.renderField}
              label={{ basic: true, content: 'Calories', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter calories..."
              maxLength="7"
            />

            <Field
              name="proteins"
              component={this.renderField}
              label={{ basic: true, content: 'Proteins', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter proteins..."
              maxLength="7"
            />
            <Field
              name="carbs"
              component={this.renderField}
              label={{ basic: true, content: 'Carbs', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter carbs..."
              maxLength="7"
            />
            <Field
              name="fats"
              component={this.renderField}
              label={{ basic: true, content: 'Fats', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter fats..."
              maxLength="7"
            />

            <Button style={buttonStyle} size="tiny" secondary content="Edit" floated="right" />
            <Button
              style={buttonStyle}
              size="tiny"
              delete
              content="Delete"
              floated="left"
              onClick={() => {
                this.handleDelete(true);
              }}
            />
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

  if (!values.name) {
    errors.name = required;
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters length"';
  }

  if (!values.brand) {
    errors.brand = required;
  } else if (values.brand.length < 2) {
    errors.brand = 'Brand must be at least 2 characters length"';
  }

  if (!values.calories) {
    errors.calories = required;
  } else if (isNaN(values.calories)) {
    errors.calories = numbers;
  }

  if (!values.proteins) {
    errors.proteins = required;
  } else if (isNaN(values.proteins)) {
    errors.proteins = numbers;
  }

  if (!values.carbs) {
    errors.carbs = required;
  } else if (isNaN(values.carbs)) {
    errors.carbs = numbers;
  }

  if (!values.fats) {
    errors.fats = required;
  } else if (isNaN(values.fats)) {
    errors.fats = numbers;
  }

  return errors;
};

export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedGrams,
      name: state.food.selectedProduct.name,
      brand: state.food.selectedProduct.brand,
      calories: state.food.selectedProduct.calories,
      proteins: state.food.selectedProduct.proteins,
      carbs: state.food.selectedProduct.carbs,
      fats: state.food.selectedProduct.fats
    }
  })),
  reduxForm({ validate, form: 'manageFood', enableReinitialize: true })
)(ManageFood);
