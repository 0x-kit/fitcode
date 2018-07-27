import React from 'react';
import { Menu, Responsive, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuSecondary = props => {
  const { activeItem, handleItemClick, authenticated } = props;

  return (
    <div style={{ marginTop: 55 }}>
      {authenticated && (
        <Responsive as={Container}>
          <Menu pointing secondary>
            <Menu.Item
              as={Link}
              to="/home"
              name="home"
              active={activeItem === 'home'}
              onClick={handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/food"
              name="food"
              active={activeItem === 'food'}
              onClick={handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/exercise"
              name="exercise"
              active={activeItem === 'exercise'}
              onClick={handleItemClick}
            />
          </Menu>
        </Responsive>
      )}
    </div>
  );
};
export default MenuSecondary;
