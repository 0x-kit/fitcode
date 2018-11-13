import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Grid from 'app/common/FormGrid.jsx';
import { Header } from 'semantic-ui-react';

import { SimpleForm } from 'app/common/Form.jsx';
import { validateEmail, validateText } from 'app/common/Validation.js';

class Signin extends Component {
  fields = [
    {
      name: 'email',
      formInput: {
        type: 'text',
        icon: 'user',
        iconPosition: 'left',
        placeholder: 'E-mail address'
      }
    },
    {
      name: 'password',
      formInput: {
        type: 'password',
        icon: 'lock',
        iconPosition: 'left',
        placeholder: 'Password'
      }
    }
  ];

  buttons = [
    {
      content: 'Sign In',
      secondary: false,
      color: 'teal',
      fluid: true,
      size: 'large',
      style: { marginBottom: 10 }
    },
    {
      content: 'Sign In using Google',
      secondary: false,
      color: 'google plus',
      fluid: true,
      size: 'large',
      href: '/api/auth/google',
      icon: { name: 'google plus' }
    }
  ];

  onSubmit = values => {
    this.props.complexSignin(values, () => {
      this.props.history.push('/food/diary');
    });
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;

    return (
      <Grid>
        <SimpleForm
          handleSubmit={handleSubmit(this.onSubmit)}
          fields={this.fields}
          buttons={this.buttons}
        />
        <Header as="h5" color="red" content={errorMessage} />
      </Grid>
    );
  }
}

const validate = ({ email, password }) => ({
  ...validateText({ password }, 5),
  ...validateEmail('email', email)
});
export default reduxForm({ validate, form: 'signin' })(Signin);
