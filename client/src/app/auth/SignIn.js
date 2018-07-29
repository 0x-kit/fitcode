import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import AuthContainer from './AuthContainer';
import FormGrid from 'app/utils/FormGrid';
import {
  Button,
  Form,
  Segment,
  Icon,
  Header,
  Input,
  Divider
} from 'semantic-ui-react';

class Signin extends Component {
  onSubmit = values => {
    this.props.complexSignin(values, () => {
      this.props.history.push('/home');
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
      <FormGrid>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Segment>
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

            <Button type="submit" color="teal" fluid size="large">
              Sign in
            </Button>
            <Divider horizontal>OR</Divider>
            <Button
              href="/api/auth/google"
              color="google plus"
              fluid
              size="large"
            >
              <Icon name="google plus" /> Sign in using Google
            </Button>
          </Segment>
          <Header as="h5" color="red">
            {this.props.errorMessage}
          </Header>
        </Form>
      </FormGrid>
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

export default AuthContainer(reduxForm({ validate, form: 'signin' })(Signin));
