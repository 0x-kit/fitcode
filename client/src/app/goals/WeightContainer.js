import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { goalsOperations } from 'app/goals/duck';
import authOperations from 'app/root/duck/operations';
import _ from 'lodash';
import withAuth from 'app/common/withAuth';
import Weight from 'app/goals/Weight.jsx';

const mapStateToProps = state => {
  return {
    currentWeight: state.goals.currentWeight,
    weightHistory: state.goals.weightHistory,
    goalWeight: state.goals.goalWeight,
    loading: state.goals.loading,
    errorMessage: state.goals.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  const selectMainTab = authOperations.selectMainTab;
  const selectSecondaryTab = authOperations.selectSecondaryTab;
  return bindActionCreators({ ...goalsOperations, selectMainTab, selectSecondaryTab }, dispatch);
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
    },
    componentWillMount() {
      const path = this.props.location.pathname.split('/');

      if (!_.isEmpty(path[1])) {
        const mainTab = path[1];
        const secondaryTab = _.isUndefined(path[2]) ? '' : path[2];

        this.props.selectMainTab(mainTab);
        this.props.selectSecondaryTab(secondaryTab);
      }
    }
  })
)(Weight);
