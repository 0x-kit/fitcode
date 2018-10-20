// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { homeOperations } from 'app/food/duck';
import authOperations from 'app/root/duck/operations';
import _ from 'lodash';

import withAuth from 'app/common/withAuth';

import SearchFood from 'app/food/diary/add/SearchFood.jsx';

const mapStateToProps = state => {
  return {
    products: state.food.products,
    userRecipes: state.food.userRecipes,
    selectedProduct: state.food.selectedProduct,
    selectedMeal: state.food.selectedMeal,
    selectedRecipe: state.food.selectedRecipe,
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
      const { id, meal } = this.props.match.params;
      const { recipe } = this.props.match.params;

      if (!_.isUndefined(recipe) && !_.isEmpty(recipe)) {
        this.props.resetRecipes();
        this.props.selectRecipe(recipe);
        this.props.complexGetRecentProducts();
      } else {
        this.props.selectMeal(id, meal);
        this.props.complexGetRecentProducts(meal);
        this.props.complexFetchRecipes();
      }
    },
    componentWillMount() {
      const path = this.props.location.pathname.split('/');

      if (!_.isEmpty(path[1])) {
        const mainTab = path[1];
        const secondaryTab = _.isUndefined(path[2]) ? '' : path[2];

        this.props.selectMainTab(mainTab);
        this.props.selectSecondaryTab(secondaryTab);
      }

      if (!_.isEmpty(this.props.searchMessage)) {
        this.props.resetSearchMessage();
      }
    }
  })
)(SearchFood);
