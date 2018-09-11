// import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, lifecycle } from "recompose";
import { homeOperations } from "app/food/duck";

import withAuth from "app/common/withAuth";
import Recipe from "app/recipe/Recipe.jsx";

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
      this.props.complexFetchRecipes();
    }
  })
)(Recipe);
