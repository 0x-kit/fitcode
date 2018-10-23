import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { goalsOperations } from 'app/goals/duck';
import authOperations from 'app/root/duck/operations';
import _ from 'lodash';
import withAuth from 'app/common/withAuth';
import UserHistory from 'app/goals/History.jsx';

const mapStateToProps = state => {
  return {
    macros: state.goals.macros,
    loading: state.goals.loading,
    date: state.food.date,
    diaries: state.goals.diaries,
    weights: state.goals.weights,
    fromDate: state.goals.fromDate,
    toDate: state.goals.toDate,
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
      this.props.complexFetchHistory(this.props.fromDate.format('YYYY-MM-DD'), this.props.toDate.format('YYYY-MM-DD'));
    },

    componentDidUpdate(prevProps) {
      if (!this.props.fromDate.isSame(prevProps.fromDate) || !this.props.toDate.isSame(prevProps.toDate)) {
        this.props.complexFetchHistory(
          this.props.fromDate.format('YYYY-MM-DD'),
          this.props.toDate.format('YYYY-MM-DD')
        );
      }
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
)(UserHistory);
