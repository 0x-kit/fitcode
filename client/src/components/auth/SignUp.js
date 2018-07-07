import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Button, Form, Segment, Header, Input } from 'semantic-ui-react';

import FormGrid from '../form/FormGrid';

class Signup extends Component {
  onSubmit = values => {
    console.log(values);
    this.props.signup(values, () => {
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
        {validateError ? (
          <Header as="label" color="red">
            {error}
          </Header>
        ) : (
          ''
        )}
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
            <Segment>
              <Field
                name="name"
                type="text"
                icon="id badge"
                iconPosition="left"
                placeholder="Name"
                component={this.renderField}
              />
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

              <Button color="teal" fluid size="large">
                Register
              </Button>
            </Segment>
            <Header as="h5" color="red">
              {this.props.errorMessage}
            </Header>
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

  if (!values.name) {
    errors.name = 'Enter a name';
  } else if (values.name.length < 5) {
    errors.name = 'Name must be at least 5 characters length"';
  }

  if (!values.email) {
    errors.email = 'Enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email adress';
  }

  if (!values.password) {
    errors.password = 'Enter a password';
  } else if (values.password.length < 5) {
    errors.password = 'Password must be at least 5 characters length"';
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
  reduxForm({ validate, form: 'signup' }),
  withRouter
)(Signup);
