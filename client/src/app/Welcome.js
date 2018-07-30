import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import queryString from 'query-string';

import SignIn from 'app/auth/SignIn';
import SignUp from 'app/auth/SignUp';
import Grid from 'app/utils/FormGrid';
import AuthContainer from './auth/AuthContainer';

const tabs = [
  {
    menuItem: 'Sign in',
    render: () => (
      <Tab.Pane attached={false}>
        <SignIn />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Register',
    render: () => (
      <Tab.Pane attached={false}>
        <SignUp />
      </Tab.Pane>
    )
  }
];

class Welcome extends Component {
  componentDidMount() {
    if (this.props.auth) {
      //Log out
      this.props.complexSignout(() => {
        this.props.history.push('/');
      });
    } else {
      // Social redirect from google
      const params = queryString.parse(this.props.location.search);
      if (params.token) {
        this.props.compleSocialSignin(params.token, params.user, () => {
          this.props.history.push('/home');
        });
      }
    }
  }

  render() {
    return (
      <div className="login-form" style={{ marginTop: 120 }}>
        <Grid>
          <Tab
            menu={{ secondary: true, pointing: true, size: 'massive' }}
            panes={tabs}
          />
        </Grid>
      </div>
    );
  }
}

export default AuthContainer(Welcome);
