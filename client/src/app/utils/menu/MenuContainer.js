import React, { Component } from 'react';
import { connect } from 'react-redux';

import SecondaryMenu from 'app/menu/SecondaryMenu';
import MainMenu from 'app/menu/MainMenu';

class MainNavbar extends Component {
  state = { activeItem: 'signin', activeItemSecondary: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleItemClickSecondary = (e, { name }) =>
    this.setState({ activeItemSecondary: name });

  render() {
    const { activeItem, activeItemSecondary } = this.state;
    const { authenticated } = this.props;
    return (
      <div>
        <MainMenu
          authenticated={authenticated}
          activeItem={activeItem}
          handleItemClick={this.handleItemClick}
        />
        <SecondaryMenu
          authenticated={authenticated}
          activeItem={activeItemSecondary}
          handleItemClick={this.handleItemClickSecondary}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(MainNavbar);
