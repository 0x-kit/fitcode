import React from 'react';
import { Header } from 'semantic-ui-react';

const Header = ({ component, attached, textAlign, content }) => (
  <Header as={component} attached={attached} textAlign={textAlign}>
    <Header.Content>{content}</Header.Content>
  </Header>
);

export default Header;
