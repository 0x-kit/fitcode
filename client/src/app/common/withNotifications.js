import React, { Component } from 'react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

const withNotifications = WrappedComponent =>
  class extends Component {
    dispatchNotification = (message, cb) => {
      const toastOptions = {
        description: message,
        icon: 'code',
        time: 1300,
        title: 'Fitcode'
      };
      setTimeout(() => {
        toast(toastOptions, () => cb(''));
      }, 200);
    };

    render() {
      return (
        <div>
          <WrappedComponent dispatchNotification={this.dispatchNotification} {...this.props} />
          <SemanticToastContainer animation="fade" position="top-right" />
        </div>
      );
    }
  };

export default withNotifications;
