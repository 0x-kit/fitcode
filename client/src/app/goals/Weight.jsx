import React, { Component } from 'react';
import { Segment, Container, Button, Grid, Statistic, Card, List, Transition, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';
import ManageWeight from 'app/goals/ManageWeight.jsx';

class Weight extends Component {
  state = { modalOpen: false };

  handleModal = flag => {
    this.setState({ modalOpen: flag });
  };

  renderWeightList(weights) {
    return (
      <Transition.Group as={List} duration={700} animation="fade" divided relaxed selection size="tiny">
        {weights.map(weightObj => {
          const { _id, date, weight } = weightObj;
          return (
            <List.Item key={_id}>
              <List.Content header={moment(date).format('YYYY-MM-DD')} floated="right" />
              <List.Icon name="weight" size="large" verticalAlign="middle" />

              <List.Content verticalAlign="middle">
                <List.Header as="a">
                  {weight}
                  KG
                </List.Header>
              </List.Content>
            </List.Item>
          );
        })}
      </Transition.Group>
    );
  }

  renderMainCard = () => {
    return (
      <Segment basic style={{ marginBottom: '0px' }}>
        <Card.Content style={{ textAlign: 'center' }}>
          <Button onClick={() => this.handleModal(true)} content="Weight Settings" secondary />
        </Card.Content>
      </Segment>
    );
  };

  renderWeights = (currentWeight, goalWeight) => {
    const cardStyle = { padding: 15 };
    return (
      <Card.Group itemsPerRow="2">
        <Card fluid raised style={cardStyle}>
          {weightGrid(goalWeight, 'Goal')}
        </Card>
        <Card fluid raised style={cardStyle}>
          {weightGrid(currentWeight, 'Current')}
        </Card>
      </Card.Group>
    );
  };

  render() {
    const { currentWeight, goalWeight, loading } = this.props;
    //console.log(currentWeight, goalWeight);
    return (
      <Container>
        {loading ? (
          <Dimmer active>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Segment padded>
            <Card.Group centered>{this.renderMainCard()}</Card.Group>

            {!_.isEmpty(currentWeight) && !_.isEmpty(goalWeight) ? (
              this.renderWeights(currentWeight.weight, goalWeight.weight)
            ) : (
              <Dimmer active>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            )}

            <ManageWeight
              date={this.props.date}
              goalWeight={this.props.goalWeight}
              currentWeight={this.props.currentWeight}
              complexEnterGoalWeight={this.props.complexEnterGoalWeight}
              complexEnterCurrentWeight={this.props.complexEnterCurrentWeight}
              openModal={this.state.modalOpen}
              handleModal={this.handleModal}
            />
          </Segment>
        )}
      </Container>
    );
  }
}

const weightGrid = (weight, label) => {
  const value = !_.isNull(weight) ? `${weight} Kg` : '';
  const weightLabel = !_.isNull(weight) ? label : `Enter ${label} weight`;
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

export default Weight;
