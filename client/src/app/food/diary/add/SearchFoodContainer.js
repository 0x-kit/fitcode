// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { homeOperations } from 'app/food/duck';

import withAuth from 'app/common/withAuth';
import SearchFood from 'app/food/diary/add/SearchFood.jsx';

const mapStateToProps = state => {
  // Return an object that will show up as props inside Home
  return {
    products: state.food.products,
    selectedProduct: state.food.selectedProduct,
    selectedMeal: state.food.selectedMeal,
    loading: state.food.loading,
    errorMessage: state.food.errorMessage
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
  withAuth
)(SearchFood);
