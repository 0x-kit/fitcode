import React from 'react';

import { Tab } from 'semantic-ui-react';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Grid from './form/FormGrid';

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
  <Grid>
    <Tab
      menu={{ secondary: true, pointing: true, size: 'massive' }}
      panes={panes}
    />
  </Grid>
);

export default TabExampleSecondaryPointing;
