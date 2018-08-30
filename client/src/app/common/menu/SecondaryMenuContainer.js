import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';

import { authOperations } from 'app/root/duck';

import homeOperations from 'app/food/duck/operations';
import exerciseOperations from 'app/exercise/duck/operations';
import goalsOperations from 'app/goals/duck/operations';

import _ from 'lodash';
import SecondaryMenu from 'app/common/menu/SecondaryMenu.jsx';
import withNotifications from 'app/common/withNotifications';
import { withRouter } from 'react-router';

const mapDispatchToProps = dispatch => {
  const resetNotificationFood = homeOperations.resetMessage;
  const resetNotificationExercise = exerciseOperations.resetMessage;
  const resetNotificationsGoals = goalsOperations.resetMessage;

  return bindActionCreators(
    { ...authOperations, resetNotificationFood, resetNotificationExercise, resetNotificationsGoals },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    mainTab: state.auth.mainTab,
    secondaryTab: state.auth.secondaryTab,
    activeIndex: state.auth.activeIndex,
    date: state.food.date,

    foodNotification: state.food.message,
    exerciseNotification: state.exercise.message,
    goalsNotification: state.goals.message
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withNotifications,
  lifecycle({
    componentWillMount() {
      const path = this.props.location.pathname.split('/');
      const mainTab = path[1];
      const secondaryTab = _.isUndefined(path[2]) ? '' : path[2];

      this.props.selectMainTab(mainTab);
      this.props.selectSecondaryTab(secondaryTab);
    },
    componentDidUpdate(prevProps) {
      const {
        foodNotification,
        exerciseNotification,
        goalsNotification,
        resetNotificationFood,
        resetNotificationExercise,
        resetNotificationsGoals
      } = this.props;

      if (!_.isEmpty(foodNotification) && foodNotification !== prevProps.foodNotification) {
        this.props.dispatchNotification(foodNotification, resetNotificationFood);
      }
      if (!_.isEmpty(exerciseNotification) && exerciseNotification !== prevProps.exerciseNotification) {
        this.props.dispatchNotification(exerciseNotification, resetNotificationExercise);
      }
      if (!_.isEmpty(goalsNotification) && goalsNotification !== prevProps.goalsNotification) {
        this.props.dispatchNotification(goalsNotification, resetNotificationsGoals);
      }
    }
  })
)(SecondaryMenu);
