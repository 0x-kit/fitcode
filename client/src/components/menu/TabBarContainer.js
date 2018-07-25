import React, { Component } from 'react';
import TabBar from 'components/menu/TabBar';
class TabBarContainer extends Component {
  constructor(props) {
    super(props);
    const firstTab = props.tabs[0];
    this.state = {
      currentTab: firstTab.name
    };
  }

  onTabClick = name => {
    this.setState({ currentTab: name });
  };

  render() {
    const { tabs, ...otherProps } = this.props;
    const { currentTab } = this.state;

    return (
      <TabBar
        {...otherProps}
        currentTab={currentTab}
        onTabClick={this.onTabClick}
        tabs={tabs}
      />
    );
  }
}

export default TabBarContainer;
