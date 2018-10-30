import React from 'react';
import { Tab } from 'semantic-ui-react';
import SignInContainer from 'app/root/SignInContainer';
import SignUpContainer from 'app/root/SignUpContainer';
import Grid from 'app/common/FormGrid.jsx';

const menuStyle = { secondary: true, pointing: true, size: 'massive' }
const divStyle = { marginTop: 60 }

const Root = () => {
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
    <div className="login-form" style={divStyle}>
      <Grid>
        <Tab menu={menuStyle} panes={tabs} />
      </Grid>
    </div>
  );
};

export default Root;
