// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { homeOperations } from 'app/food/duck';
import authOperations from 'app/root/duck/operations';
import _ from 'lodash';
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
  const selectMainTab = authOperations.selectMainTab;
  const selectSecondaryTab = authOperations.selectSecondaryTab;
  return bindActionCreators({ ...homeOperations, selectMainTab, selectSecondaryTab }, dispatch);
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
)(MineFood);
