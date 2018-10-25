import React, { Component } from 'react';
import ManageExercise from 'app/exercise/ManageExercise.jsx';
import CreateExercise from 'app/exercise/CreateExercise.jsx';
import _ from 'lodash';
import { Card, List, Header, Container, Segment, Button } from 'semantic-ui-react';

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
      <List divided relaxed selection>
        {exerciseArr.map(exercise => {
          const { _id, name, calories } = exercise;
          return (
            <List.Item onClick={() => this.selectExercise(exercise)} key={_id}>
              <List.Icon name="heartbeat" style={{ float: 'left' }} size="large" verticalAlign="top" />

              <List.Content floated="left" header={{ content: name, as: 'a' }} />
              <List.Content content={`${calories} KCAL`} style={{ float: 'right', marginLeft: '5px' }} />
            </List.Item>
          );
        })}
      </List>
    );
  }

  renderMainCard = () => {
    const headerStyle = { fontSize: '1.21428571rem' };
    return (
      <Segment basic style={{ marginBottom: '0px', marginTop: '15px' }}>
        <Card.Content style={{ textAlign: 'center' }}>
          <Header style={headerStyle} size="medium">
            Today's Exercises
          </Header>
          <Button content="Create Exercise" secondary onClick={() => this.handleCreateModal(true)} compact primary />
        </Card.Content>
      </Segment>
    );
  };

  renderSummary = totalCalories => {
    const header = totalCalories !== 0 ? totalCalories + ' KCAL' : '';
    const style = { paddingRight: '0.5em' };
    return (
      <List>
        <List.Item>
          <List.Content floated="right" header={header} style={style} />
        </List.Item>
      </List>
    );
  };

  renderContent = userExercises => {
    return (
      <Card raised fluid>
        <Card.Content>
          <Card.Header>Exercises</Card.Header>
          {this.renderExerciseList(userExercises)}
        </Card.Content>
      </Card>
    );
  };

  render() {
    // handleSubmit provided by reduxForm
    const { selectedExercise, userExercises } = this.props;
    const { manageModal, createModal } = this.state;
    const containerStyle = { marginBottom: '2rem' };
    return (
      <Container style={containerStyle}>
        <Card.Group centered>
          {this.renderMainCard()}

          {!_.isEmpty(userExercises) && this.renderContent(userExercises)}

          <ManageExercise
            openModal={manageModal}
            handleModal={this.handleManageModal}
            selectedExercise={selectedExercise}
            {...this.props}
          />

          <CreateExercise openModal={createModal} handleModal={this.handleCreateModal} {...this.props} />
        </Card.Group>
      </Container>
    );
  }
}

export default Exercise;
