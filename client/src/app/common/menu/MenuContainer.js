import React, { Component } from 'react';
import { connect } from 'react-redux';

import SecondaryMenu from 'app/common/menu/SecondaryMenu.jsx';
import MainMenu from 'app/common/menu/MainMenu.jsx';

class MainNavbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <MainMenu authenticated={authenticated} />
        <SecondaryMenu authenticated={authenticated} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(MainNavbar);
