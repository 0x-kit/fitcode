import React, { Component } from 'react';
import { Menu, Responsive, Container, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

class MenuSecondary extends Component {
  state = { activeItem: 'diary' };

  handleItemClick = name => this.setState({ activeItem: name });

  renderPanes = () => {
    const activeItem = this.state.activeItem;
    const handleClick = this.handleItemClick;
    const mainItemStyle = { outline: 'none', fontWeight: 700 };
    const secondaryItemStyle = { outline: 'none' };
    // const menuStyle = { marginTop: '-0.55em', marginBottom: '0em' };
    return [
      {
        menuItem: (
          <Menu.Item as={Link} to="/food/diary" key="food" style={mainItemStyle} onClick={() => handleClick('diary')}>
            Food
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane as={Container} fluid>
            <Menu widths="3" text>
              <Menu.Item
                as={Link}
                to="/food/diary"
                name="Diary"
                active={activeItem === 'diary'}
                style={secondaryItemStyle}
                onClick={() => handleClick('diary')}
              />
              <Menu.Item
                as={Link}
                to="/food/mine"
                name="My Foods"
                active={activeItem === 'myFoods'}
                style={secondaryItemStyle}
                onClick={() => handleClick('myFoods')}
              />
              <Menu.Item
                as={Link}
                to="/food/recipes"
                name="Recipes"
                active={activeItem === 'recipes'}
                style={secondaryItemStyle}
                onClick={() => handleClick('recipes')}
              />
            </Menu>
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item
            header
            as={Link}
            to="/goals/diet"
            key="goals"
            style={mainItemStyle}
            onClick={() => handleClick('diet')}
          >
            Goals
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane as={Container}>
            <Menu widths="3" borderless text>
              <Menu.Item
                as={Link}
                to="/goals/diet"
                name="Diet"
                active={activeItem === 'diet'}
                style={secondaryItemStyle}
                onClick={() => handleClick('diet')}
              />
              <Menu.Item
                as={Link}
                to="/goals/weight"
                name="Weight"
                active={activeItem === 'weight'}
                style={secondaryItemStyle}
                onClick={() => handleClick('weight')}
              />
              <Menu.Item
                as={Link}
                to="/goals/history"
                name="History"
                active={activeItem === 'history'}
                style={secondaryItemStyle}
                onClick={() => handleClick('history')}
              />
            </Menu>
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item header as={Link} to="/exercise" key="exercise" style={mainItemStyle}>
            Exercise
          </Menu.Item>
        )
      }
    ];
  };
  render() {
    const { authenticated } = this.props;
    const panes = this.renderPanes();

    return (
      <div style={{ marginTop: 75 }}>
        {authenticated && (
          <Responsive as={Container}>
            <Tab menu={{ pointing: true, size: 'huge', borderless: true, widths: 3 }} panes={panes} />
          </Responsive>
        )}
      </div>
    );
  }
}

export default compose(withRouter)(MenuSecondary);
