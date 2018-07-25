import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import * as actions from 'actions';

class SocialAuthRedirect extends Component {
  componentDidMount() {
    const params = queryString.parse(this.props.location.search);

    this.props.socialSignin(params.token, () => {
      this.props.history.push('/home');
    });
  }

  render() {
    return <div />;
  }
}

export default connect(
  null,
  actions
)(SocialAuthRedirect);
