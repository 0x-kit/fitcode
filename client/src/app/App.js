import React from 'react';
import SecondaryMenu from 'app/common/menu/SecondaryMenuContainer';
import MainMenu from 'app/common/menu/MainMenu';
import { Container } from 'semantic-ui-react';

import 'app/common/styles/index.css';
import 'semantic-ui-css/semantic.min.css';

export default ({ children }) => {
  return (
    <Container>
      <MainMenu />
      <SecondaryMenu />
      {children}
    </Container>
  );
};
