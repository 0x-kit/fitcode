import React from 'react';
import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';
import Grid from 'components/form/FormGrid';

import { Tab } from 'semantic-ui-react';

const panes = [
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

const TabExampleSecondaryPointing = () => (
  <div className="login-form" style={{ marginTop: 120 }}>
    <Grid>
      <Tab
        menu={{ secondary: true, pointing: true, size: 'massive' }}
        panes={panes}
      />
    </Grid>
  </div>
);

export default TabExampleSecondaryPointing;
