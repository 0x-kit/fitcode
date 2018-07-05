import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Menu, Image, Container } from 'semantic-ui-react';
import logo from '../assets/logo.png';

class Header extends Component {
  state = { activeItem: 'signin' };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
              Fitcode
            </Menu.Item>

            {this.props.authenticated && (
              <Menu.Item
                as={Link}
                to="/auth/signout"
                name="signout"
                active={activeItem === 'signout'}
                onClick={this.handleItemClick}
              >
                Sign Out
              </Menu.Item>
            )}
            {this.props.authenticated && (
              <Menu.Item
                as={Link}
                to="/feature"
                name="feature"
                active={activeItem === 'feature'}
                onClick={this.handleItemClick}
              >
                Feature
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
