import React, { Component } from 'react';
import { Menu, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainMenu extends Component {
  state = { activeItem: 'signin', activeItemSecondary: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { authenticated, userInfo } = this.props;
    const { activeItem, handleItemClick } = this.state;
    //const userInfo = localStorage.getItem('userInfo');

    return (
      <Menu as={Menu} widths={2} inverted stackable>
        <Menu.Item as={Link} to={!authenticated ? '/' : '/food/diary'} header style={{ outline: 'none' }}>
          <h3>
            <Icon color="green" name="code" style={{ marginRight: '1.3em' }} />
            Fitcode = {userInfo}
          </h3>
        </Menu.Item>
        {/* <Menu.Item style={{ outline: 'none' }}>
          <h4>
            <Icon color="green" name="user secret" style={{ marginRight: '1.3em' }} />
            {userInfo}
          </h4>
        </Menu.Item> */}
        <Menu.Item
          position="right"
          as={Link}
          to="/"
          name="signout"
          active={activeItem === 'signout'}
          onClick={handleItemClick}
          style={{ outline: 'none' }}
        >
          <h3>
            <Icon color="green" name="power off" style={{ marginRight: '1.3em' }} />
            Logout
          </h3>
        </Menu.Item>
        {/* {authenticated && (
      <span></span>
            <Menu.Item style={{ outline: 'none' }}>
              <h3>
                <Icon color="green" name="user secret" style={{ marginRight: '0.3em' }} />
                {userInfo}
              </h3>
            </Menu.Item>
            <Menu.Item
          
              as={Link}
              to="/"
              name="signout"
              active={activeItem === 'signout'}
              onClick={handleItemClick}
              style={{ outline: 'none' }}
            >
              <h2>
                <Icon color="green" name="power off" />
              </h2>
            </Menu.Item>

        )} */}

      </Menu>
    );
  }
}

export default MainMenu;
