import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Button, Form, Segment, Icon, Divider } from 'semantic-ui-react';

import FormGrid from '../form/FormGrid';
import FormField from '../form/FormField';
import fieldProps from '../form/FieldProps';

class Signin extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    // handleSubmit provided by reduxForm
    const { handleSubmit } = this.props;
    return (
      <div className="login-form">
        <FormGrid>
          <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
            <Segment>
              <FormField fieldProps={fieldProps.email} />
              <FormField fieldProps={fieldProps.password} />

              <Button color="teal" fluid size="large">
                Sign in
              </Button>

              <Divider horizontal>Or</Divider>

              <Button color="google plus" fluid size="large">
                <Icon name="google plus" /> Sign in using Google
              </Button>
            </Segment>

            <div>{this.props.errorMessage}</div>
          </Form>
        </FormGrid>
      </div>
    );
  }
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
  reduxForm({ form: 'signin' }),
  withRouter
)(Signin);
