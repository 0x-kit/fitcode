import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { authOperations } from './duck';

export default ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth.authenticated,
      errorMessage: state.auth.errorMessage
    };
  }

  return compose(
    connect(
      mapStateToProps,
      authOperations
    ),
    withRouter
  )(ComposedComponent);
};
