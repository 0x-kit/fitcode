// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { exerciseOperations } from 'app/exercise/duck';

import withAuth from 'app/common/withAuth';
import Exercise from 'app/exercise/Exercise.jsx';

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
  return bindActionCreators({ ...exerciseOperations }, dispatch);
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
    }
  })
)(Exercise);
