import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { authOperations } from 'app/root/duck';
import queryString from 'query-string';
import Root from 'app/root/Root.jsx';

const mapStateToProps = state => {
  return {
    auth: state.auth.authenticated,
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
  lifecycle({
    componentDidMount() {
      if (this.props.auth) {
        //Log out
        this.props.complexSignout(() => {
          this.props.history.push('/');
        });
      } else {
        // Social redirect from google
        const params = queryString.parse(this.props.location.search);
        if (params.token) {
          this.props.complexSocialSignin(params.token, params.user, () => {
            this.props.history.push('/food/diary');
          });
        }
      }
    }
  })
)(Root);
