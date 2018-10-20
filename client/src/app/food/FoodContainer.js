import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { homeOperations } from 'app/food/duck';

import authOperations from 'app/root/duck/operations';
import moment from 'moment';
import _ from 'lodash';

import withAuth from 'app/common/withAuth';
import withNotifications from 'app/common/withNotifications';
import Food from 'app/food/Food.jsx';

const mapStateToProps = state => {
  return {
    mealsData: state.food.meals,
    loading: state.food.loading,
    macros: state.food.macros,
    exerciseCals: state.food.exerciseCals,

    selectedProduct: state.food.selectedProduct,
    selectedRecipe: state.food.selectedRecipe,
    selectedMeal: state.food.selectedMeal,
    selectedGrams: state.food.selectedGrams,

    date: state.food.date,
    errorMessage: state.food.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  const selectMainTab = authOperations.selectMainTab;
  const selectSecondaryTab = authOperations.selectSecondaryTab;

  return bindActionCreators({ ...homeOperations, selectMainTab, selectSecondaryTab }, dispatch);
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuth,
  withNotifications,
  lifecycle({
    componentWillMount() {
      const path = this.props.location.pathname.split('/');

      if (!_.isEmpty(path[1])) {
        const mainTab = path[1];
        const secondaryTab = _.isUndefined(path[2]) ? '' : path[2];

        this.props.selectMainTab(mainTab);
        this.props.selectSecondaryTab(secondaryTab);
      }

      const param = this.props.match.params.date;

      if (!_.isUndefined(param)) {
        const date = moment(param);
        if (!date.isValid()) {
          this.props.history.push('/food/diary');
        } else {
          const now = moment().format('YYYY-MM-DD');
          const path = !moment(now).isSame(moment(param)) ? `/food/diary/${param}` : '/food/diary';
          this.props.history.replace({ pathname: path });
        }
        this.props.complexFetchHome(moment(param));
      } else {
        this.props.complexFetchHome(this.props.date);
      }
    },
    componentDidUpdate(prevProps) {
      if (!this.props.date.isSame(prevProps.date)) {
        this.props.complexFetchHome(this.props.date);
      }
    }
  })
)(Food);
