import React from 'react';
import { Menu, Responsive, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MainMenu = props => {
  const { activeItem, handleItemClick, authenticated } = props;

  return (
    <Responsive as={Menu} fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to={!authenticated ? '/' : '/home'} header>
          <h3>
            <Icon color="green" name="code" style={{ marginRight: '1.3em' }} />Fitcode
          </h3>
        </Menu.Item>
        {authenticated && (
          <Menu.Menu position="right">
            <Menu.Item>User Info</Menu.Item>
            <Menu.Item
              position="right"
              as={Link}
              to="/auth/signout"
              name="signout"
              active={activeItem === 'signout'}
              onClick={handleItemClick}
            >
              <h4>Sign Out</h4>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Responsive>
  );
};
export default MainMenu;
