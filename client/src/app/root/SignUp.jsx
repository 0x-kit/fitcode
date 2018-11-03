import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import Grid from 'app/common/FormGrid.jsx';
import { Header } from 'semantic-ui-react';
import { SimpleForm } from 'app/common/Form.jsx';
import { validateEmail, validateText } from 'app/common/Validation.js';

const headerStyle = { marginBottom: 0 };

class Signup extends Component {
  fields = [
    {
      name: 'name',
      formInput: { type: 'text', icon: 'id badge', iconPosition: 'left', placeholder: 'Name' }
    },
    {
      name: 'email',
      formInput: { type: 'text', icon: 'user', iconPosition: 'left', placeholder: 'E-mail address' }
    },
    {
      name: 'password',
      formInput: { type: 'password', icon: 'lock', iconPosition: 'left', placeholder: 'Password' }
    }
  ];

  buttons = [{ content: 'Register', secondary: false, color: 'teal', fluid: true, size: 'large' }];

  onSubmit = values => {
    this.props.complexSignUp(values, () => {
      this.props.history.push('/food/diary');
    });
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;
    return (
      <Grid>
        <SimpleForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
        <Header style={headerStyle} as="h5" color="red" content={errorMessage} />
      </Grid>
    );
  }
}

const validate = ({ name, email, password }) => ({
  ...validateText('name', name, 5),
  ...validateText('password', password, 5),
  ...validateEmail('email', email)
});

export default reduxForm({ validate, form: 'signup' })(Signup);
