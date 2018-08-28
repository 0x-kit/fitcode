import React, { Component } from 'react';
import {
  Segment,
  Container,
  Header,
  Button,
  Form,
  Input,
  Grid,
  Statistic,
  Card,
  Label,
  List,
  Transition
} from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';
import _ from 'lodash';

class Weight extends Component {
  onSubmit = values => {
    const { goalWeight, currentWeight } = values;

    if (this.props.goalWeight.weight !== goalWeight) {
      const newGoalWeight = { weight: goalWeight };
      this.props.complexEnterGoalWeight(newGoalWeight);
    }

    if (this.props.currentWeight.weight !== currentWeight) {
      const newCurrentWeight = {
        date: moment().format('YYYY-MM-DD'),
        weight: currentWeight
      };
      this.props.complexEnterCurrentWeight(newCurrentWeight);
    }
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

  renderField = field => {
    const {
      placeholder,
      label,
      labelPosition,
      maxLength,
      type,
      labelInput,
      meta: { touched, error }
    } = field;

    let validateError = false;

    if (touched && error) {
      validateError = true;
    }

    return (
      <Form.Field>
        <Input
          labelPosition={labelPosition}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          {...field.input}
        >
          <Label className="weightLabel" basic>
            {labelInput}
          </Label>
          <input style={{ textAlign: 'center' }} />
          <Label basic>{label.content}</Label>
        </Input>
        {validateError ? (
          <Header as="label" color="red" size="tiny" textAlign="center">
            {error}
          </Header>
        ) : (
          ''
        )}
      </Form.Field>
    );
  };

  render() {
    const buttonStyle = { marginTop: '15px', marginBottom: '15px', width: '275px' };
    const cardGroupStyle = { marginBottom: '1.5em' };
    const cardStyle = { padding: 15 };
    const { handleSubmit, loading, currentWeight, goalWeight, weightHistory } = this.props;

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

            <Form onSubmit={handleSubmit(this.onSubmit)}>
              <Form.Group widths={2}>
                <Field
                  name="currentWeight"
                  component={this.renderField}
                  label={{ content: 'kg', pointing: 'left' }}
                  labelPosition="right"
                  placeholder="Enter your current weight..."
                  type="text"
                  maxLength="7"
                  labelInput="Current Weight"
                />
                <Field
                  name="goalWeight"
                  component={this.renderField}
                  label={{ content: 'kg', pointing: 'left' }}
                  labelPosition="right"
                  placeholder="Enter your goal weight..."
                  type="text"
                  maxLength="7"
                  labelInput="Goal Weight"
                />
              </Form.Group>
              <Card.Group centered>
                <Button secondary style={buttonStyle}>
                  Update
                </Button>
              </Card.Group>
            </Form>

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

const validate = values => {
  const errors = {};
  const required = 'Required field';
  const numbers = 'This field can only contain numbers';

  if (!values.goalWeight) {
    errors.goalWeight = required;
  } else if (isNaN(values.goalWeight)) {
    errors.goalWeight = numbers;
  }

  if (!values.currentWeight) {
    errors.currentWeight = required;
  } else if (isNaN(values.currentWeight)) {
    errors.currentWeight = numbers;
  }

  return errors;
};

export default compose(
  connect(state => ({
    initialValues: {
      goalWeight: state.goals.goalWeight.weight,
      currentWeight: state.goals.currentWeight.weight
    }
  })),
  reduxForm({ validate, form: 'setWeight', enableReinitialize: true })
)(Weight);
