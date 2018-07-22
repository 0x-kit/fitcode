import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class SocialAuthRedirect extends Component {
  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    this.props.socialSignin(token, () => {
      this.props.history.push('/feature');
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
