import React, { Component } from 'react';
import { Segment, Container, Header, Button, Form, Input } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class Macros extends Component {
  onSubmit = macros => {
    this.props.complexEditMacros(macros);
  };
  renderField = field => {
    const {
      placeholder,
      label,
      labelPosition,
      maxLength,
      type,
      labelInput,
      meta: { touched, error }
    } = field;

    let validateError = false;

    if (touched && error) {
      validateError = true;
    }

    return (
      <Form.Field>
        <label>{labelInput}</label>
        <Input
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
    const buttonStyle = { marginTop: '10px' };
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Segment padded="very">
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Form.Group widths={2}>
              <Field
                name="calories"
                component={this.renderField}
                labelInput="Calories"
                placeholder="Calories"
                type="text"
                maxLength="7"
                label={{ content: 'kcal' }}
                labelPosition="right"
              />
              <Field
                name="proteins"
                component={this.renderField}
                labelInput="Proteins"
                placeholder="Proteins"
                type="text"
                maxLength="7"
                label={{ content: 'g' }}
                labelPosition="right"
              />
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                name="carbs"
                component={this.renderField}
                labelInput="Carbs"
                placeholder="Carbs"
                type="text"
                maxLength="7"
                label={{ content: 'g' }}
                labelPosition="right"
              />
              <Field
                name="fats"
                component={this.renderField}
                labelInput="Fats"
                placeholder="Fats"
                type="text"
                maxLength="7"
                label={{ content: 'g' }}
                labelPosition="right"
              />
            </Form.Group>
            <Button style={buttonStyle} secondary>
              Set Macros
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const validate = values => {
  const errors = {};
  const required = 'Required field';
  const numbers = 'This field can only contain numbers';

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
      calories: state.goals.macros.calories,
      proteins: state.goals.macros.proteins,
      carbs: state.goals.macros.carbs,
      fats: state.goals.macros.fats
    }
  })),
  reduxForm({ validate, form: 'setGoals', enableReinitialize: true })
)(Macros);
