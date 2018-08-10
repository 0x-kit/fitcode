// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { homeOperations } from 'app/home/duck';

import withAuth from 'app/common/withAuth';
import SearchProduct from 'app/home/new/SearchProduct.jsx';

const mapStateToProps = state => {
  // Return an object that will show up as props inside Home
  return {
    products: state.home.products,
    selectedProduct: state.home.selectedProduct,
    selectedMeal: state.home.selectedMeal,
    loading: state.home.loading,
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
  withAuth
)(SearchProduct);
