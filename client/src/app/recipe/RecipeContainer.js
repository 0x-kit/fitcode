// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { homeOperations } from 'app/food/duck';
import authOperations from 'app/root/duck/operations';
import _ from 'lodash';
import withAuth from 'app/common/withAuth';
import Recipe from 'app/recipe/Recipe.jsx';

const mapStateToProps = state => {
  return {
    userRecipes: state.food.userRecipes,
    selectedProduct: state.food.selectedProduct,
    selectedGrams: state.food.selectedGrams,
    selectedRecipe: state.food.selectedRecipe,
    loading: state.food.loading,
    errorMessage: state.food.errorMessage
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
    componentWillMount() {
      const path = this.props.location.pathname.split('/');

      if (!_.isEmpty(path[1])) {
        const mainTab = path[1];
        const secondaryTab = _.isUndefined(path[2]) ? '' : path[2];

        this.props.selectMainTab(mainTab);
        this.props.selectSecondaryTab(secondaryTab);
      }

      this.props.complexFetchRecipes();
    }
  })
)(Recipe);
