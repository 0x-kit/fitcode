import React, { Component } from 'react';
import _ from 'lodash';
import ManageWeight from 'app/goals/ManageWeight.jsx';
import { Segment, Container, Button, Grid, Statistic, Card, Dimmer, Loader } from 'semantic-ui-react';

class Weight extends Component {
  state = { modalOpen: false };

  handleModal = flag => this.setState({ modalOpen: flag });

  renderMainCard = () => {
    const segmentStyle = { marginBottom: '0px' };
    const cardStyle = { textAlign: 'center' };
    return (
      <Segment basic style={segmentStyle}>
        <Card.Content
          style={cardStyle}
          content={<Button onClick={() => this.handleModal(true)} content="Weight Settings" secondary />}
        />
      </Segment>
    );
  };

  weightGrid = (weight, label) => {
    const value = !_.isNull(weight) ? `${weight} Kg` : '';
    const weightLabel = !_.isNull(weight) ? label : `Enter today's current weight!`;
    return (
      <Grid textAlign="center">
        <Grid.Row>
          <Grid.Column computer={8} mobile={16}>
            <Statistic value={value} label={weightLabel} size="tiny" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  renderWeights = (currentWeight, goalWeight) => {
    const cardStyle = { padding: 15 };
    return (
      <Card.Group itemsPerRow="2">
        <Card fluid raised style={cardStyle} content={this.weightGrid(goalWeight, 'Goal')} />
        <Card fluid raised style={cardStyle} content={this.weightGrid(currentWeight, 'Current')} />
      </Card.Group>
    );
  };

  render() {
    const { currentWeight, goalWeight, loading } = this.props;
    return (
      <div>
        {loading ? (
          <Dimmer active>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Container>
            <Card.Group centered content={this.renderMainCard()} />

            {!_.isEmpty(currentWeight) &&
              !_.isEmpty(goalWeight) &&
              this.renderWeights(currentWeight.weight, goalWeight.weight)}

            <ManageWeight
              date={this.props.date}
              goalWeight={this.props.goalWeight}
              currentWeight={this.props.currentWeight}
              complexEnterGoalWeight={this.props.complexEnterGoalWeight}
              complexEnterCurrentWeight={this.props.complexEnterCurrentWeight}
              openModal={this.state.modalOpen}
              handleModal={this.handleModal}
            />
          </Container>
        )}
      </div>
    );
  }
}

export default Weight;
