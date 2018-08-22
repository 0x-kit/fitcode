// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { homeOperations } from 'app/food/duck';

import withAuth from 'app/common/withAuth';
import MineFood from 'app/food/mine/MineFood.jsx';

const mapStateToProps = state => {
  // Return an object that will show up as props inside Home
  return {
    userProducts: state.food.userProducts,
    selectedProduct: state.food.selectedProduct,
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
      this.props.complexGetUserProducts();
    }
  })
)(MineFood);
