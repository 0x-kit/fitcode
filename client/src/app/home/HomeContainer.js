// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { homeOperations } from 'app/home/duck';

import withAuth from 'app/common/withAuth';
import Home from 'app/home/Home.jsx';

const mapStateToProps = state => {
  // Return an object that will show up as props inside Home
  return {
    goalsData: state.home.goals,
    mealsData: state.home.meals,
    loading: state.home.loading
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
      this.props.complexFetchGoals();
      this.props.complexFetchMeals();
    }
  })
)(Home);
