import React, { Component } from 'react';
import TabMeals from 'components/home/meals/TabMeals';
class TabMealsContainer extends Component {
  handleChange = (e, data) => this.setState(data);

  render() {
    const { panes } = this.props;
    return <TabMeals panes={panes} handleChange={this.handleChange} />;
  }
}

export default TabMealsContainer;
