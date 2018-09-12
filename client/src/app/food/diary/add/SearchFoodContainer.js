// import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, lifecycle } from "recompose";
import { homeOperations } from "app/food/duck";
import _ from "lodash";

import withAuth from "app/common/withAuth";

import SearchFood from "app/food/diary/add/SearchFood.jsx";

const mapStateToProps = state => {
  return {
    products: state.food.products,
    selectedProduct: state.food.selectedProduct,
    selectedMeal: state.food.selectedMeal,
    selectedRecipe: state.food.selectedRecipe,

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
      const { id, meal } = this.props.match.params;
      const { recipe } = this.props.match.params;

      if (_.isUndefined(meal)) {
        this.props.selectRecipe(recipe);
        this.props.complexGetRecentProducts();
      } else {
        this.props.selectMeal(id, meal);
        this.props.complexGetRecentProducts(meal);
      }
    },
    componentWillMount() {
      if (!_.isEmpty(this.props.searchMessage)) {
        this.props.resetSearchMessage();
      }
    }
  })
)(SearchFood);
