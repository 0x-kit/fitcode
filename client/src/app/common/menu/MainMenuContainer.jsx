import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authOperations } from 'app/root/duck';

import MainMenu from 'app/common/menu/MainMenu.jsx';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...authOperations }, dispatch);
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);
