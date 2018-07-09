import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import * as actions from 'actions';

class Signout extends Component {
  componentDidMount() {
    this.props.signout(() => {
      this.props.history.push('/');
    });
  }
  render() {
    return <div> Sorry to see you go!</div>;
  }
}

export default compose(
  connect(
    null,
    actions
  ),
  withRouter
)(Signout);
