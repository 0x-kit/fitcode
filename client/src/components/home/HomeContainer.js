import React, { Component } from 'react';
import { Segment, Responsive, Container } from 'semantic-ui-react';
import requireAuth from 'components/requireAuth';

import DietSummary from 'components/home/diet/DietSummary';
import TabMealsContainer from 'components/home/meals/TabMealsContainer';
import MealTable from 'components/home/meals/MealTable';

const segments = [
  { content: 'Calories', subheader: 1580, remaining: 30 },
  { content: 'Proteins', subheader: 160, remaining: 40 },
  { content: 'Carbs', subheader: 20, remaining: 15 },
  { content: 'Fats', subheader: 89, remaining: 33 }
];

const labels = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];

const tableData = [
  { name: 'Apples', calories: 50, proteins: 3, carbs: 10, fats: 0 },
  { name: 'Chocolate', calories: 70, proteins: 4, carbs: 10, fats: 0 },
  { name: 'Total', calories: 50, proteins: 57, carbs: 38, fats: 3 }
];

class HomeContainer extends Component {
  state = { toggleRemaining: false };

  onSegmentClick = toggle => {
    this.setState({ toggleRemaining: toggle });
  };

  getTableData = label => {
    if (label === 'Lunch') {
      return [
        { name: 'Banana', calories: 20, proteins: 13, carbs: 23, fats: 1 },
        { name: 'Coke', calories: 30, proteins: 44, carbs: 15, fats: 2 },
        { name: 'Total', calories: 50, proteins: 57, carbs: 38, fats: 3 }
      ];
    }
    return tableData;
  };

  createPanes = labels => {
    //panes required to render the Tabs with their corresponding table
    let panesArr = [];
    labels.forEach(label => {
      panesArr.push({
        menuItem: label,
        render: () => <MealTable tableData={this.getTableData(label)} />
      });
    });
    return panesArr;
  };

  render() {
    return (
      <Responsive as={Container}>
        <Segment padded>
          <DietSummary
            onSegmentClick={this.onSegmentClick}
            toggle={this.state.toggleRemaining}
            as={Segment}
            segments={segments}
          />
          <TabMealsContainer panes={this.createPanes(labels)} />
        </Segment>
      </Responsive>
    );
  }
}

export default requireAuth(HomeContainer);
