import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { goalsOperations } from 'app/goals/duck';

import withAuth from 'app/common/withAuth';
import Macros from 'app/goals/Macros.jsx';

const mapStateToProps = state => {
  return {
    macros: state.goals.macros,
    loading: state.goals.loading,
    errorMessage: state.goals.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...goalsOperations }, dispatch);
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuth,
  lifecycle({
    componentDidMount() {
      this.props.complexFetchGoals();
    }
  })
)(Macros);
