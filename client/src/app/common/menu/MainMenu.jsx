import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainMenu extends Component {
  render() {
    const { authenticated } = this.props;

    // let userName;
    // if (authenticated) {
    //   userName = userInfo.split(' ')[0];
    // }

    return (
      <Menu inverted size="mini" widths="2" borderless style={{ borderRadius: '0' }}>
        <Menu.Item as="a" header>
          <h2 style={{ textAlign: 'right', paddingBottom: '0.1em' }}>
            <Icon color="green" name="code" style={{ marginRight: '0.4em' }} />
            Fitcode
          </h2>
        </Menu.Item>

        {authenticated && (
          <Menu.Item as={Link} to="/" header>
            <h3 style={{ textAlign: 'left' }}>
              Log out
              <Icon color="red" name="power off" style={{ marginLeft: '0.4em' }} />
              {/* <p style={{ textAlign: 'center', fontSize: '1rem' }}>{userName}</p> */}
            </h3>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

export default MainMenu;
