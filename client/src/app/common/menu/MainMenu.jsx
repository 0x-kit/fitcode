import React, { Component } from 'react';
import { Menu, Container, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainMenu extends Component {
  state = { activeItem: 'signin', activeItemSecondary: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { authenticated, userInfo } = this.props;
    const { activeItem, handleItemClick } = this.state;

    return (
      <Menu inverted size="huge" borderless>
        <Container>
          <Menu.Item as='a' header>
            <h3>
              <Icon color="green" name="code" style={{ marginRight: '1.3em' }} />
              Fitcode
          </h3>
          </Menu.Item>
          {authenticated &&
            <Dropdown item simple text={userInfo}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link}
                  to="/"
                  text="Log out"
                  icon='power off'
                  active={activeItem === 'signout'}
                  onClick={handleItemClick} />
              </Dropdown.Menu>
            </Dropdown>
          }
        </Container>
      </Menu>
    );
  }
}

export default MainMenu;
