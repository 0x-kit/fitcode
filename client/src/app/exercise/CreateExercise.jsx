import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { Header, Modal, Input, Form, Button } from 'semantic-ui-react';
import moment from 'moment';
class CreateExercise extends Component {
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('createFood'));
  };

  onSubmit = values => {
    // console.log(values);
    const { name, calories } = values;
    const newExercise = {
      user: localStorage.getItem('userId'),
      date: moment().format('YYYY-MM-DD'),
      name,
      calories
    };

    this.props.complexAddExercise(newExercise);

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
    const buttonStyle = { marginBottom: 10, width: 270};
    return (
      <Modal style={{ width: 300, textAlign: 'center' }} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader="Enter name and calories" content="Add Your Exercise" />
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
              name="calories"
              component={this.renderField}
              label={{ basic: true, content: 'Calories', className: 'createFood' }}
              labelPosition="left"
              placeholder="Enter calories..."
              maxLength="7"
            />

            <Button style={buttonStyle} secondary content="Add" />
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

  if (!values.calories) {
    errors.calories = required;
  } else if (isNaN(values.calories)) {
    errors.calories = numbers;
  }

  return errors;
};

export default reduxForm({ validate, form: 'createExercise', enableReinitialize: true })(CreateExercise);
