// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { exerciseOperations } from 'app/exercise/duck';
import authOperations from 'app/root/duck/operations';
import withAuth from 'app/common/withAuth';
import Exercise from 'app/exercise/Exercise.jsx';
import _ from 'lodash';

const mapStateToProps = state => {
  return {
    userExercises: state.exercise.userExercises,
    selectedExercise: state.exercise.selectedExercise,
    exerciseCals: state.exercise.exerciseCals,
    loading: state.food.loading,
    errorMessage: state.food.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  const selectMainTab = authOperations.selectMainTab;
  const selectSecondaryTab = authOperations.selectSecondaryTab;
  return bindActionCreators({ ...exerciseOperations, selectMainTab, selectSecondaryTab }, dispatch);
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuth,
  lifecycle({
    componentDidMount() {
      this.props.complexFetchExercises();
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
)(Exercise);
