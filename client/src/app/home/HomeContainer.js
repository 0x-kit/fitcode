import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import requireAuth from 'app/utils/requireAuth';
import { homeOperations } from './duck';

import HomeComponent from './HomeComponent';

class HomeContainer extends Component {
  state = { toggleRemaining: false };

  componentDidMount() {
    this.props.complexFetchDiet();
    this.props.complexFetchMeals();
  }

  render() {
    return <HomeComponent {...this.props} />;
  }
}

const mapStateToProps = state => {
  // Return an object that will show up as props inside HomeContainer
  return {
    dietsummary: state.home.diet,
    mealsData: state.home.meals,
    loading: state.home.loading
  };
};

export default compose(
  connect(
    mapStateToProps,
    homeOperations
  ),
  requireAuth
)(HomeContainer);
