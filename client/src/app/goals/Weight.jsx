import React, { Component } from 'react';
import { Segment, Container, Button, Grid, Statistic, Card, List, Transition } from 'semantic-ui-react';
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
  render() {
    const { currentWeight, goalWeight, weightHistory, loading } = this.props;

    const buttonStyle = { marginTop: '15px', width: '275px' };
    const cardGroupStyle = { marginBottom: '2.5em' };
    const cardStyle = { padding: 15 };

    return (
      <Container>
        {!loading ? (
          <Segment padded="very">
            <Card.Group itemsPerRow="2" style={cardGroupStyle}>
              <Card fluid raised style={cardStyle}>
                {weightGrid(currentWeight.weight, 'Current')}
              </Card>

              <Card fluid raised style={cardStyle}>
                {weightGrid(goalWeight.weight, 'Goal')}
              </Card>
            </Card.Group>
            <Card.Group centered>
              <Button onClick={() => this.handleModal(true)} content="Update" secondary style={buttonStyle} />
            </Card.Group>

            <ManageWeight
              goalWeight={this.props.goalWeight}
              currentWeight={this.props.currentWeight}
              complexEnterGoalWeight={this.props.complexEnterGoalWeight}
              complexEnterCurrentWeight={this.props.complexEnterCurrentWeight}
              openModal={this.state.modalOpen}
              handleModal={this.handleModal}
            />

            {weightHistory.length !== 0 && (
              <Card fluid raised>
                <Card.Content>
                  <Card.Header>Weight History</Card.Header>
                </Card.Content>
                <Card.Content>{this.renderWeightList(weightHistory)}</Card.Content>
              </Card>
            )}
          </Segment>
        ) : (
          <div />
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
