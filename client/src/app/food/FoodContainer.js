import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { homeOperations } from 'app/food/duck';
import moment from 'moment';
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
      const param = this.props.match.params.date;

      if (param) {
        const date = moment(param);
        if (!date.isValid()) {
          this.props.history.push('/food/diary');
        } else {
          const now = moment().format('YYYY-MM-DD');
          const path = !moment(now).isSame(moment(param)) ? `/food/diary/${param}` : '/food/diary';

          this.props.complexSetDay(moment(param));
          this.props.history.replace({ pathname: path });
        }
      }

      this.props.complexFetchHome(this.props.date);
    },
    componentDidUpdate(prevProps) {
      if (!this.props.date.isSame(prevProps.date)) {
        this.props.complexFetchHome(this.props.date);
      }
    }
  })
)(Food);
