import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Container, Statistic, Card, Grid, Button } from 'semantic-ui-react';
import ManageMacros from 'app/goals/ManageMacros.jsx';

class Macros extends Component {
  state = { modalOpen: false };

  handleModal = flag => {
    this.setState({ modalOpen: flag });
  };

  render() {
    const cardStyle = { padding: 15, marginBottom: '2.5em' };
    const buttonStyle = { marginTop: '15px', width: '275px' };
    const { loading } = this.props;
    return (
      <Container>
        {!loading ? (
          <Segment padded="very">
            <Card.Group centered>
              <Card fluid raised style={cardStyle}>
                {macrosGrid(this.props.macros)}
              </Card>

              <Button onClick={() => this.handleModal(true)} content="Update" secondary style={buttonStyle} />
            </Card.Group>

            <ManageMacros
              complexEditMacros={this.props.complexEditMacros}
              openModal={this.state.modalOpen}
              handleModal={this.handleModal}
            />
          </Segment>
        ) : (
          <div />
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
      <Statistic value={value} label={label} size="tiny" />
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
