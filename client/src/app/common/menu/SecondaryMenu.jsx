import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Menu, Container, Tab } from 'semantic-ui-react';
import Date from 'app/food/diary/Date.jsx';

class MenuSecondary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment().format('YYYY-MM-DD')
    };
  }

  checkNow(date) {
    return moment(this.state.now).isSame(moment(date).format('YYYY-MM-DD'));
  }

  renderSecondaryMenuItem = (path, name) => {
    const secondaryItem = this.props.secondaryTab;
    const secondaryItemStyle = { outline: 'none' };

    return (
      <Menu.Item
        as={Link}
        to={path}
        name={name}
        active={secondaryItem === name.toLowerCase()}
        style={secondaryItemStyle}
        onClick={() => {
          this.props.selectSecondaryTab(name.toLowerCase());
        }}
      />
    );
  };

  renderMainMenuItem = (path, name, activeSecondary) => {
    const mainItem = this.props.mainTab;
    const mainItemStyle = { outline: 'none', fontWeight: 700 };

    return (
      <Menu.Item
        as={Link}
        to={path}
        name={name}
        key={name}
        active={mainItem === name.toLowerCase()}
        style={mainItemStyle}
        onClick={() => {
          this.props.selectSecondaryTab(activeSecondary.toLowerCase());
          this.props.selectMainTab(name.toLowerCase());
        }}
      />
    );
  };

  renderPanes = date => {
    const diaryPath = !this.checkNow(date) ? `/food/diary/${date.format('YYYY-MM-DD')}` : '/food/diary';
    const myFoodsPath = '/food/mine';
    const recipesPath = '/food/recipes';
    const dietPath = '/goals/diet';
    const weightPath = '/goals/weight';
    const historyPath = '/goals/history';
    const exercisePath = '/exercise';

    return [
      {
        menuItem: this.renderMainMenuItem(diaryPath, 'Food', 'Diary'),
        render: () => (
          <Tab.Pane as={Container} fluid>
            <Menu widths="3" text>
              {this.renderSecondaryMenuItem(diaryPath, 'Diary')}
              {this.renderSecondaryMenuItem(myFoodsPath, 'Mine')}
              {this.renderSecondaryMenuItem(recipesPath, 'Recipes')}
            </Menu>
          </Tab.Pane>
        )
      },
      {
        menuItem: this.renderMainMenuItem(exercisePath, 'Exercise', '')
      },
      {
        menuItem: this.renderMainMenuItem(dietPath, 'Goals', 'Diet'),
        render: () => (
          <Tab.Pane as={Container}>
            <Menu widths="3" borderless text>
              {this.renderSecondaryMenuItem(dietPath, 'Diet')}
              {this.renderSecondaryMenuItem(weightPath, 'Weight')}
              {this.renderSecondaryMenuItem(historyPath, 'History')}
            </Menu>
          </Tab.Pane>
        )
      }
    ];
  };
  render() {
    const menuStyle = { pointing: true, size: 'huge', borderless: true, widths: 3 };
    const { authenticated, activeIndex, date, loading } = this.props;
    return (
      <div className="SecMenu" style={{ marginTop: 5, marginBottom: 0 }}>
        {authenticated && (
          <Container>
            <Date {...this.props} />
            <Tab activeIndex={activeIndex} menu={menuStyle} panes={this.renderPanes(date)} />
          </Container>
        )}
      </div>
    );
  }
}

export default MenuSecondary;
