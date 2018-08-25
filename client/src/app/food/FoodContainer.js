import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import queryString from 'query-string';
import moment from 'moment';
import { homeOperations } from 'app/food/duck';

import withAuth from 'app/common/withAuth';
import Food from 'app/food/Food.jsx';

const mapStateToProps = state => {
  return {
    mealsData: state.food.meals,
    loading: state.food.loading,
    macros: state.food.macros,

    selectedProduct: state.food.selectedProduct,
    selectedMeal: state.food.selectedMeal,
    selectedGrams: state.food.selectedGrams,

    date: state.food.date,
    errorMessage: state.food.errorMessage,
    editMode: state.auth.editMode
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...homeOperations }, dispatch);
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuth,
  lifecycle({
    componentDidMount() {
      const params = queryString.parse(this.props.location.search);

      if (params.date) {
        const now = moment().format('YYYY-MM-DD');

        if (moment(now).isSame(moment(params.date))) {
          this.props.history.replace({
            pathname: '/food/diary'
          });
        } else {
          this.props.history.push(`?date=${params.date}`);
        }
        this.props.complexSetDay(moment(params.date));
      }

      this.props.complexFetchHome(this.props.date);
    },
    componentDidUpdate(prevProps) {
      if (!this.props.date.isSame(prevProps.date)) this.props.complexFetchHome(this.props.date);
    }
  })
)(Food);
