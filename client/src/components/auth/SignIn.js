import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {
  Button,
  Form,
  Segment,
  Icon,
  Divider,
  Label,
  Input
} from 'semantic-ui-react';

import FormGrid from '../form/FormGrid';

class Signin extends Component {
  onSubmit = values => {
    this.props.signin(values, () => {
      this.props.history.push('/feature');
    });
  };

  renderField(field) {
    // form states: pristine, touched, invalid
    const {
      icon,
      iconPosition,
      placeholder,
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
          icon={icon}
          iconPosition={iconPosition}
          placeholder={placeholder}
          type={type}
          {...field.input}
        />
        {validateError ? <Label pointing>{error}</Label> : ''}
      </Form.Field>
    );
  }

  render() {
    // handleSubmit provided by reduxForm
    const { handleSubmit } = this.props;
    return (
      <div className="login-form">
        <FormGrid>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Segment stacked>
              <Field
                name="email"
                type="text"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                component={this.renderField}
              />
              <Field
                name="password"
                type="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                component={this.renderField}
              />
              <Divider />
              <Button type="submit" color="teal" fluid size="large">
                Sign in
              </Button>
              <Divider horizontal>Or</Divider>
              <Button color="google plus" fluid size="large">
                <Icon name="google plus" /> Sign in using Google
              </Button>
              <div>{this.props.errorMessage}</div>
            </Segment>
          </Form>
        </FormGrid>
      </div>
    );
  }
}

function validate(values) {
  //console.log(values) -> {email: 'email@email.com, password: 'password'}
  const errors = {};

  // Validate the inputs from 'values' - names of fields is the glue
  if (!values.email) {
    errors.email = 'Enter an email';
  }

  if (!values.password) {
    errors.password = 'Enter a password';
  }
  // If errors is empty, the form is fine to submit
  // If erros has *any* properties, reduxform assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

// Apply multiple higher components to Signup in a attractive syntax
export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ validate, form: 'signin' }),
  withRouter
)(Signin);
