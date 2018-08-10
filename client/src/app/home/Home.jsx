import React, { Component } from 'react';
import { Segment, Responsive, Container, Dimmer, Loader, Menu, Button, Icon } from 'semantic-ui-react';

import DietGoal from 'app/home/DietGoal.jsx';
import MealCard from 'app/home/MealCard.jsx';
import Date from 'app/home/Date.jsx';

class HomeComponent extends Component {
  render() {
    const { loading } = this.props;
    console.log(this.props.errorMessage);
    return (
      <Responsive as={Container}>
        {loading ? (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : (
          <Segment padded>
            {/* <MenuExampleMenus /> */}
            <Date/>
            <DietGoal {...this.props} />

            <MealCard {...this.props} />
          </Segment>
        )}
      </Responsive>
    );
  }
}

// const CardExampleFluid = () => (
//   <Card fluid raised>
//     <List divided>
//       <List.Item>
//         <List.Content floated="right">
//           <Icon size="large" name="arrow right" />
//         </List.Content>

//         <List.Content>
//           <Icon size="large" name="arrow left" />
//         </List.Content>
//       </List.Item>
//     </List>
//   </Card>
// );

const CardExample2 = () => (
  <Segment padded basic>
    <Button floated="left" size="small" icon="arrow left" />
    <span>Thursday, August 9, 2018</span>
    <Button floated="right" size="small" icon="arrow right" />
  </Segment>
);

export class MenuExampleMenus extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu widths="3">
        <Menu.Item onClick={this.handleItemClick}>
          <Icon name="arrow left" />
        </Menu.Item>

        <Menu.Item name="Thursday, August 9, 2018 " />

        <Menu.Item onClick={this.handleItemClick}>
          <Icon name="arrow right" />
        </Menu.Item>
      </Menu>
    );
  }
}

export default HomeComponent;
