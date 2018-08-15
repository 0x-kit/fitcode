import React, { Component } from 'react';
import { Menu, Responsive, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MenuSecondary extends Component {
  state = { activeItem: 'food' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { authenticated } = this.props;
    const { activeItem } = this.state;
    return (
      <div style={{ marginTop: 72 }}>
        {authenticated && (
          <Responsive as={Container}>
            <Menu pointing secondary size="massive">
              <Menu.Item
                as={Link}
                to="/food/diary"
                name="food"
                active={activeItem === 'food'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/exercise"
                name="exercise"
                active={activeItem === 'exercise'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Responsive>
        )}
      </div>
    );
  }
}
export default MenuSecondary;
