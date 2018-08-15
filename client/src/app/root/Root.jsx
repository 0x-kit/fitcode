import React from 'react';
import { Tab } from 'semantic-ui-react';
import SignInContainer from 'app/root/SignInContainer';
import SignUpContainer from 'app/root/SignUpContainer';
import Grid from 'app/common/styles/FormGrid.jsx';

const Root = props => {
  const tabs = [
    {
      menuItem: 'Sign in',
      render: () => (
        <Tab.Pane attached={false}>
          <SignInContainer />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Register',
      render: () => (
        <Tab.Pane attached={false}>
          <SignUpContainer />
        </Tab.Pane>
      )
    }
  ];
  return (
    <div className="login-form" style={{ marginTop: 120 }}>
      <Grid>
        <Tab menu={{ secondary: true, pointing: true, size: 'massive' }} panes={tabs} />
      </Grid>
    </div>
  );
};

export default Root;
