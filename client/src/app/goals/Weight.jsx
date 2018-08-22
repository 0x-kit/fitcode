import React, { Component } from 'react';
import { Segment, Container, Header, Button, Form, Divider, Input } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';
import _ from 'lodash';

class Weight extends Component {
  onSubmit = values => {
    if (_.has(values, 'currentWeight')) {
      const currentDate = moment().format('YYYY-MM-DD');

      const currentWeight = {
        date: currentDate,
        weight: values.currentWeight
      };

      this.props.complexEnterCurrentWeight(currentWeight);
    }
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
    console.log(this.props.currentWeight);
    return (
      <Container>
        <Segment padded="very">
          <Divider horizontal>Check-In</Divider>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="currentWeight"
              component={this.renderField}
              label={{ content: 'kg' }}
              labelPosition="right"
              placeholder="Enter your current weight..."
              type="text"
              maxLength="7"
              labelInput="Current Weight"
            />
            <Button secondary style={buttonStyle}>
              Set Current Weight
            </Button>

            <Divider horizontal>Goal</Divider>

            <Field
              name="goalWeight"
              component={this.renderField}
              label={{ content: 'kg' }}
              labelPosition="right"
              placeholder="Enter your goal weight..."
              type="text"
              maxLength="7"
              labelInput="Goal Weight"
            />

            <Button secondary style={buttonStyle}>
              Set Goal Weight
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

  if (!values.goalWeight) {
    errors.goalWeight = required;
  } else if (isNaN(values.goalWeight)) {
    errors.goalWeight = numbers;
  }

  if (isNaN(values.currentWeight) && !_.isEmpty(values.currentWeight)) {
    errors.currentWeight = numbers;
  }

  return errors;
};

export default compose(
  connect(state => ({
    initialValues: {
      goalWeight: state.goals.goalWeight,
      currentWeight: state.goals.currentWeight.weight
    }
  })),
  reduxForm({ validate, form: 'setWeight', enableReinitialize: true })
)(Weight);
