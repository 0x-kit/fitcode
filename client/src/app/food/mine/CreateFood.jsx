import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { Header, Modal, Input, Form, Button } from 'semantic-ui-react';

class CreateFood extends Component {
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('createFood'));
  };

  onSubmit = values => {
    const { name, brand, calories, proteins, carbs, fats } = values;
    const newProduct = {
      name,
      brand,
      calories,
      proteins,
      carbs,
      fats,
      user: localStorage.getItem('userId')
    };
    this.props.complexAddPersonalProduct(newProduct);

    this.handleClose();
  };

  renderField = field => {
    const {
      placeholder,
      label,
      type,
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
    const { handleSubmit, openModal } = this.props;
    const buttonStyle = { marginBottom: 10, width: 242 };
    return (
      <Modal style={{ width: 270, textAlign: 'center' }} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader="Enter the nutritional info " content="Create Your Food" />
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="name"
              component={this.renderField}
              label={{ basic: true, content: 'Name', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter name..."
              type="text"
            />
            <Field
              name="brand"
              component={this.renderField}
              label={{ basic: true, content: 'Brand', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter brand..."
              type="text"
            />

            <Field
              name="calories"
              component={this.renderField}
              label={{ basic: true, content: 'Calories', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter calories..."
              maxLength="7"
              type="number"
            />

            <Field
              name="proteins"
              component={this.renderField}
              label={{ basic: true, content: 'Proteins', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter proteins..."
              maxLength="7"
              type="number"
            />
            <Field
              name="carbs"
              component={this.renderField}
              label={{ basic: true, content: 'Carbs', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter carbs..."
              maxLength="7"
              type="number"
            />
            <Field
              name="fats"
              component={this.renderField}
              label={{ basic: true, content: 'Fats', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter fats..."
              maxLength="7"
              type="number"
            />

            <Button style={buttonStyle} size="small" secondary content="Add" />
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
  const negative = 'This field cant contain negative values';

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
  } else if (values.calories < 0) {
    errors.calories = negative;
  }

  if (!values.proteins) {
    errors.proteins = required;
  } else if (isNaN(values.proteins)) {
    errors.proteins = numbers;
  } else if (values.proteins < 0) {
    errors.proteins = negative;
  }

  if (!values.carbs) {
    errors.carbs = required;
  } else if (isNaN(values.carbs)) {
    errors.carbs = numbers;
  } else if (values.carbs < 0) {
    errors.carbs = negative;
  }

  if (!values.fats) {
    errors.fats = required;
  } else if (isNaN(values.fats)) {
    errors.fats = numbers;
  } else if (values.fats < 0) {
    errors.fats = negative;
  }

  return errors;
};

export default reduxForm({ validate, form: 'createFood', enableReinitialize: true })(CreateFood);
