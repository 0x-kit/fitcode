import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field, reset } from 'redux-form';
import { Header, Modal, Input, Form, Button, Label, Card } from 'semantic-ui-react';

class ManageMacros extends Component {
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('manageMacros'));
  };

  onSubmit = macros => {
    this.props.handleModal(false);
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
        <Input
          labelPosition={labelPosition}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          {...field.input}
        >
          <Label className="macrosLabel" basic>
            {labelInput}
          </Label>
          <input style={{ textAlign: 'center', width: 70 }} />
          <Label className="macrosLabelContent" basic>
            {label.content}
          </Label>
        </Input>
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
    const buttonStyle = { marginTop: '15px', marginBottom: '15px', width: '275px' };
    const { handleSubmit } = this.props;
    const { openModal } = this.props;

    return (
      <Modal style={{ width: 300, textAlign: 'center' }} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader="Enter your diet requirements" content="Edit Your Macros" />
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="calories"
              component={this.renderField}
              labelInput="Calories"
              placeholder="Calories"
              type="number"
              maxLength="7"
              label={{ content: 'kcal' }}
              labelPosition="right"
            />
            <Field
              name="proteins"
              component={this.renderField}
              labelInput="Proteins"
              placeholder="Proteins"
              type="number"
              maxLength="7"
              label={{ content: 'g' }}
              labelPosition="right"
            />
            <Field
              name="carbs"
              component={this.renderField}
              labelInput="Carbs"
              placeholder="Carbs"
              type="number"
              maxLength="7"
              label={{ content: 'g' }}
              labelPosition="right"
            />
            <Field
              name="fats"
              component={this.renderField}
              labelInput="Fats"
              placeholder="Fats"
              type="number"
              maxLength="7"
              label={{ content: 'g' }}
              labelPosition="right"
            />

            <Card.Group centered>
              <Button content="Update" secondary style={buttonStyle} />
            </Card.Group>
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

export default compose(
  connect(state => ({
    initialValues: {
      calories: state.goals.macros.calories,
      proteins: state.goals.macros.proteins,
      carbs: state.goals.macros.carbs,
      fats: state.goals.macros.fats
    }
  })),
  reduxForm({ validate, form: 'manageMacros', enableReinitialize: true })
)(ManageMacros);
