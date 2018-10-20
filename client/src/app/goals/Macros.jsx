import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Container, Statistic, Card, Grid, Button, Dimmer, Loader } from 'semantic-ui-react';
import ManageMacros from 'app/goals/ManageMacros.jsx';

class Macros extends Component {
  state = { modalOpen: false };

  handleModal = flag => {
    this.setState({ modalOpen: flag });
  };

  renderMacros = macros => {
    const cardStyle = { padding: 15 };
    return (
      <Card fluid raised style={cardStyle}>
        {macrosGrid(macros)}
      </Card>
    );
  };

  renderMainCard = () => {
    return (
      <Segment basic style={{ marginBottom: '0px' }}>
        <Card.Content style={{ textAlign: 'center' }}>
          {/* <Header size="medium">Your Diet</Header> */}
          <Button onClick={() => this.handleModal(true)} content="Diet Settings" secondary />
        </Card.Content>
      </Segment>
    );
  };

  render() {
    const { loading, macros } = this.props;

    return (
      <Container>
        {loading ? (
          <Dimmer active>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Segment padded>
            <Card.Group centered>
              {this.renderMainCard()}

              {!loading && !_.isEmpty(macros) ? this.renderMacros(macros) : <div />}
            </Card.Group>

            <ManageMacros
              complexEditMacros={this.props.complexEditMacros}
              openModal={this.state.modalOpen}
              handleModal={this.handleModal}
            />
          </Segment>
        )}
      </Container>
    );
  }
}

const macrosGrid = macros => {
  const { calories, proteins, carbs, fats } = macros;
  const labels = ['Calories', 'Proteins', 'Carbs', 'Fats'];
  const values = [calories, proteins, carbs, fats];

  const renderStatistic = (label, value, index) => (
    <Grid.Column computer={4} tablet={4} mobile={8} key={index}>
      <Statistic value={value} label={label} size="tiny" style={{ marginBottom: '15px', marginTop: '15px' }} />
    </Grid.Column>
  );
  return (
    <Grid textAlign="center">
      {!_.isNull(calories && proteins && carbs && fats) ? (
        <Grid.Row>
          {labels.map((label, index) => {
            return renderStatistic(label, values[index], index);
          })}
        </Grid.Row>
      ) : (
        <Grid.Row>
          <Grid.Column computer={16}>
            <Statistic label="Enter macros" size="tiny" />
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

export default Macros;
