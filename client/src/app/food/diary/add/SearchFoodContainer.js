// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
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
    errorMessage: state.food.errorMessage,
    searchMessage: state.food.searchMessage
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
      this.props.complexSearchProducts(null, true);
    },
    componentWillMount() {
      this.props.complexSearchProducts(null, true);
    }
  })
)(SearchFood);
