import React, { Component } from 'react';
import ManageExercise from 'app/exercise/ManageExercise.jsx';
import CreateExercise from 'app/exercise/CreateExercise.jsx';
import _ from 'lodash';
import { Card, List, Header, Container, Segment, Button } from 'semantic-ui-react';

const containerStyle = { marginBottom: '2rem' };

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
    const iconStyle = { float: 'left' };
    const listContentStyle = { float: 'right', marginLeft: '5px' };

    return (
      <List divided relaxed selection>
        {exerciseArr.map(exercise => {
          const { _id, name, calories } = exercise;
          const listHeaderStyle = { content: name, as: 'a' };
          return (
            <List.Item onClick={() => this.selectExercise(exercise)} key={_id}>
              <List.Icon name="heartbeat" style={iconStyle} size="large" verticalAlign="top" />
              <List.Content floated="left" header={listHeaderStyle} />
              <List.Content content={`${calories} KCAL`} style={listContentStyle} />
            </List.Item>
          );
        })}
      </List>
    );
  }

  renderMainCard = () => {
    const headerStyle = { fontSize: '1.21428571rem' };
    const segmentStyle = { marginBottom: '0px', marginTop: '15px' };
    const cardContentStyle = { textAlign: 'center' };
    return (
      <Segment basic style={segmentStyle}>
        <Card.Content style={cardContentStyle}>
          <Header style={headerStyle} size="medium" content="Today's Exercises" />
          <Button content="Create Exercise" secondary onClick={() => this.handleCreateModal(true)} compact primary />
        </Card.Content>
      </Segment>
    );
  };

  renderSummary = totalCalories => {
    const header = totalCalories !== 0 ? totalCalories + ' KCAL' : '';
    const listContentStyle = { paddingRight: '0.5em' };
    return (
      <List>
        <List.Item>
          <List.Content floated="right" header={header} style={listContentStyle} />
        </List.Item>
      </List>
    );
  };

  renderContent = userExercises => (
    <Card raised fluid>
      <Card.Content header="Exercises" content={this.renderExerciseList(userExercises)} />
    </Card>
  );

  render() {
    const { selectedExercise, userExercises, loading } = this.props;
    const { manageModal, createModal } = this.state;

    return (
      <Container style={containerStyle}>
        <Card.Group centered>
          {this.renderMainCard()}

          {!_.isEmpty(userExercises) && !loading && this.renderContent(userExercises)}

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
