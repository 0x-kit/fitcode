import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { authOperations } from './duck';
import SignUp from 'app/auth/SignUp.jsx';

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...authOperations }, dispatch);
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(SignUp);
