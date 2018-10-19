import React, { Component } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainMenu extends Component {
  state = { activeItem: 'signin', activeItemSecondary: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { authenticated, userInfo } = this.props;
    const { activeItem, handleItemClick } = this.state;

    return (
      <Menu inverted size="large" borderless style={{ borderRadius: '0' }}>
        <Menu.Item as="a" header>
          <h2>
            <Icon color="green" name="code" style={{ marginRight: '0.3em' }} />
            Fitcode
          </h2>
        </Menu.Item>
        {authenticated && (
          <Dropdown item simple text={userInfo} style={{ paddingLeft: '0.1em', paddingRight: '0.1em' }}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/"
                text="Log out"
                icon="power off"
                active={activeItem === 'signout'}
                onClick={handleItemClick}
                style={{ textAlign: 'center' }}
              />
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu>
    );
  }
}

export default MainMenu;
