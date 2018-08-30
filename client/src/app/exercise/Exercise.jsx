import React, { Component } from 'react';
import ManageExercise from 'app/exercise/ManageExercise.jsx';
import CreateExercise from 'app/exercise/CreateExercise.jsx';
import _ from 'lodash';
import { Card, List, Header, Responsive, Container, Segment, Button, Transition } from 'semantic-ui-react';

class Exercise extends Component {
  state = { manageModal: false, createModal: false };

  handleManageModal = flag => this.setState({ manageModal: flag });

  handleCreateModal = flag => this.setState({ createModal: flag });

  selectExercise = exercise => {
    this.props.selectExercise(exercise);
    this.handleManageModal(true);
  };

  renderExerciseList(exercises) {
    const exerciseArr = _.map(exercises);

    return (
      <Transition.Group as={List} duration={700} animation="fade" divided relaxed selection>
        {exerciseArr.map(exercise => {
          const { _id, name, calories } = exercise;
          return (
            <List.Item onClick={() => this.selectExercise(exercise)} key={_id}>
              <List.Content floated="right" verticalAlign="middle" description={`${calories} KCAL`} />

              <List.Icon name="heartbeat" size="large" verticalAlign="middle" />

              <List.Content verticalAlign="middle">
                <List.Header as="a">{name}</List.Header>
              </List.Content>
            </List.Item>
          );
        })}
      </Transition.Group>
    );
  }

  render() {
    // handleSubmit provided by reduxForm
    const { selectedExercise, userExercises, exerciseCals } = this.props;
    const { manageModal, createModal } = this.state;
    const totalCalories = exerciseCals.calories;
    const header = totalCalories !== 0 ? totalCalories + ' KCAL' : '';
    const style = { paddingRight: '0.5em' };
    return (
      <Responsive as={Container}>
        <Segment padded>
          <Card raised fluid>
            <Card.Content textAlign="center">
              <Header size="medium">Today's Exercises</Header>
            </Card.Content>
            <Card.Content>{this.renderExerciseList(userExercises)}</Card.Content>
            <Card.Content extra>
              <List>
                <List.Item>
                  <List.Content floated="right" header={header} style={style} />
                  <Button
                    content="Create Exercise"
                    secondary
                    onClick={() => this.handleCreateModal(true)}
                    size="small"
                    compact
                    primary
                  />
                </List.Item>
              </List>
            </Card.Content>
          </Card>

          <ManageExercise
            openModal={manageModal}
            handleModal={this.handleManageModal}
            selectedExercise={selectedExercise}
            {...this.props}
          />

          <CreateExercise openModal={createModal} handleModal={this.handleCreateModal} {...this.props} />
        </Segment>
      </Responsive>
    );
  }
}

export default Exercise;
