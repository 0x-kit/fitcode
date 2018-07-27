import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';
import Grid from 'components/form/FormGrid';

class Welcome extends Component {
  shouldNavigateAway() {
    if (this.props.auth) {
      this.props.history.push('/home');
    }
  }

  componentDidMount() {
    this.shouldNavigateAway();
  }

  createPanes = () => {
    return [
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
  };

  render() {
    return (
      <div className="login-form" style={{ marginTop: 120 }}>
        <Grid>
          <Tab
            menu={{ secondary: true, pointing: true, size: 'massive' }}
            panes={this.createPanes()}
          />
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default connect(mapStateToProps)(Welcome);
