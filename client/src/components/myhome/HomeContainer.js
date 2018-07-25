import React, { Component } from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import SegmentHomeGroup from 'components/myhome/HomeGroup';
import HomeTable from 'components/myhome/HomeTable';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { toggleRemaining: false };
  }

  onSegmentClick = toggle => {
    this.setState({ toggleRemaining: toggle });
  };

  render() {
    const segments = [
      { content: 'Calories', subheader: 1580, remaining: 300 },
      { content: 'Proteins', subheader: 160, remaining: 400 },
      { content: 'Carbs', subheader: 20, remaining: 350 },
      { content: 'Fats', subheader: 89, remaining: 890 }
    ];
    return (
      <Segment>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header as="h4" attached="top" textAlign="center">
                <Header.Content>Your Daily Summary</Header.Content>
              </Header>
              <SegmentHomeGroup
                onSegmentClick={this.onSegmentClick}
                toggle={this.state.toggleRemaining}
                as={Segment}
                segments={segments}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={12}>
              <HomeTable />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default HomeContainer;
