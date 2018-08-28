import React from 'react';
import SecondaryMenuContainer from 'app/common/menu/SecondaryMenuContainer';
import MainMenuContainer from 'app/common/menu/MainMenuContainer';
import { Container } from 'semantic-ui-react';

import 'app/common/styles/index.css';
import 'semantic-ui-css/semantic.min.css';

export default ({ children }) => {
  return (
    <Container>
      <MainMenuContainer />
      <SecondaryMenuContainer />
      {children}
    </Container>
  );
};
