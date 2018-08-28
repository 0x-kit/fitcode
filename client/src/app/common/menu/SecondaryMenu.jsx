import React, { Component } from 'react';
import { Menu, Responsive, Container, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MenuSecondary extends Component {
  renderPanes = () => {
    const mainItem = this.props.mainTab;
    const secondaryItem = this.props.secondaryTab;

    const mainItemStyle = { outline: 'none', fontWeight: 700 };
    const secondaryItemStyle = { outline: 'none' };

    const renderSecondaryMenuItem = (path, name) => {
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

    const renderMainMenuItem = (path, name, activeSecondary) => {
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
    return [
      {
        menuItem: renderMainMenuItem('/food/diary', 'Food', 'Diary'),
        render: () => (
          <Tab.Pane as={Container} fluid>
            <Menu widths="3" text>
              {renderSecondaryMenuItem('/food/diary', 'Diary')}
              {renderSecondaryMenuItem('/food/mine', 'Mine')}
              {renderSecondaryMenuItem('/food/recipes', 'Recipes')}
            </Menu>
          </Tab.Pane>
        )
      },
      {
        menuItem: renderMainMenuItem('/exercise', 'Exercise', '')
      },
      {
        menuItem: renderMainMenuItem('/goals/diet', 'Goals', 'Diet'),
        render: () => (
          <Tab.Pane as={Container}>
            <Menu widths="3" borderless text>
              {renderSecondaryMenuItem('/goals/diet', 'Diet')}
              {renderSecondaryMenuItem('/goals/weight', 'Weight')}
              {renderSecondaryMenuItem('/goals/history', 'History')}
            </Menu>
          </Tab.Pane>
        )
      }
    ];
  };
  render() {
    const menuStyle = { pointing: true, size: 'huge', borderless: true, widths: 3 };
    const { authenticated, activeIndex } = this.props;

    return (
      <div style={{ marginTop: 75 }}>
        {authenticated && (
          <Responsive as={Container}>
            <Tab activeIndex={activeIndex} menu={menuStyle} panes={this.renderPanes()} />
          </Responsive>
        )}
      </div>
    );
  }
}

export default MenuSecondary;
