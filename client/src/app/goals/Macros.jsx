import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Container, Statistic, Card, Grid, Button, Dimmer, Loader } from 'semantic-ui-react';
import ManageMacros from 'app/goals/ManageMacros.jsx';

class Macros extends Component {
  state = { modalOpen: false };

  handleModal = flag => this.setState({ modalOpen: flag });

  renderMainCard = () => {
    const segmentStyle = { marginBottom: '0px' };
    const cardStyle = { textAlign: 'center' };
    return (
      <Segment basic style={segmentStyle}>
        <Card.Content
          style={cardStyle}
          content={<Button onClick={() => this.handleModal(true)} content="Diet Settings" secondary />}
        />
      </Segment>
    );
  };

  renderMacros = ({ calories, proteins, carbs, fats }) => {
    const labels = ['Calories', 'Proteins', 'Carbs', 'Fats'];
    const values = [calories, proteins, carbs, fats];
    const cardStyle = { padding: 15 };

    const renderGrid = (label, value, index) => (
      <Card fluid raised style={cardStyle} key={index}>
        <Grid textAlign="center">
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <Statistic value={value} label={label} size="tiny" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
    );

    return (
      <Card.Group itemsPerRow="2">{labels.map((label, index) => renderGrid(label, values[index], index))}</Card.Group>
    );
  };

  render() {
    const { loading, macros } = this.props;

    return (
      <div>
        {loading ? (
          <Dimmer active>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Container>
            <Card.Group centered content={this.renderMainCard()} />

            {!_.isEmpty(macros) && this.renderMacros(macros)}

            <ManageMacros
              complexEditMacros={this.props.complexEditMacros}
              openModal={this.state.modalOpen}
              handleModal={this.handleModal}
            />
          </Container>
        )}
      </div>
    );
  }
}

export default Macros;
