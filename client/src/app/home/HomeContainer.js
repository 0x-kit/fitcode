// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import queryString from 'query-string';
import moment from 'moment';
import { homeOperations } from 'app/home/duck';

import withAuth from 'app/common/withAuth';
import Home from 'app/home/Home.jsx';

const mapStateToProps = state => {
  // Return an object that will show up as props inside Home
  return {
    goalsData: state.home.goals,
    mealsData: state.home.meals,
    loading: state.home.loading,
    selectedProduct: state.home.selectedProduct,
    selectedMeal: state.home.selectedMeal,
    selectedGrams: state.home.selectedGrams,
    date: state.home.date,
    errorMessage: state.home.errorMessage
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
            pathname: '/home'
          });
        }
        this.props.complexSetDay(moment(params.date));
      }

      this.props.complexFetchHome(this.props.date);
    },
    componentDidUpdate(prevProps) {
      if (!this.props.date.isSame(prevProps.date)) this.props.complexFetchHome(this.props.date);
    }
  })
)(Home);
