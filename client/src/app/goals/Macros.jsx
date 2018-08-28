import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Container, Header, Button, Form, Input, Statistic, Card, Grid, Label } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class Macros extends Component {
  onSubmit = macros => {
    this.props.complexEditMacros(macros);
  };
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
          <Label className="macrosLabel" basic>
            {labelInput}
          </Label>
          <input style={{ textAlign: 'center' }} />
          <Label className="macrosLabelContent" basic>
            {label.content}
          </Label>
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
    const buttonStyle = { marginTop: '15px', width: '275px' };
    const cardStyle = { padding: 15, marginBottom: '2.5em' };
    const { handleSubmit, loading } = this.props;
    return (
      <Container>
        {!loading ? (
          <Segment padded="very">
            <Card fluid raised style={cardStyle}>
              {macrosGrid(this.props.macros)}
            </Card>

            <Form onSubmit={handleSubmit(this.onSubmit)}>
              <Form.Group widths={2}>
                <Field
                  name="calories"
                  component={this.renderField}
                  labelInput="Calories"
                  placeholder="Calories"
                  type="text"
                  maxLength="7"
                  label={{ content: 'kcal' }}
                  labelPosition="right"
                />
                <Field
                  name="proteins"
                  component={this.renderField}
                  labelInput="Proteins"
                  placeholder="Proteins"
                  type="text"
                  maxLength="7"
                  label={{ content: 'g' }}
                  labelPosition="right"
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Field
                  name="carbs"
                  component={this.renderField}
                  labelInput="Carbs"
                  placeholder="Carbs"
                  type="text"
                  maxLength="7"
                  label={{ content: 'g' }}
                  labelPosition="right"
                />
                <Field
                  name="fats"
                  component={this.renderField}
                  labelInput="Fats"
                  placeholder="Fats"
                  type="text"
                  maxLength="7"
                  label={{ content: 'g' }}
                  labelPosition="right"
                />
              </Form.Group>
              <Card.Group centered>
                <Button content="Update" secondary style={buttonStyle} />
              </Card.Group>
            </Form>
          </Segment>
        ) : (
          <div />
        )}
      </Container>
    );
  }
}

// const Field = (name, label, renderField) => (
//   <Field
//     name={name}
//     component={renderField}
//     labelInput={label}
//     placeholder={label}
//     type="text"
//     maxLength="7"
//     label={{ content: 'g' }}
//     labelPosition="right"
//   />
// );

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

const validate = values => {
  const errors = {};
  const required = 'Required field';
  const numbers = 'This field can only contain numbers';

  if (!values.calories) {
    errors.calories = required;
  } else if (isNaN(values.calories)) {
    errors.calories = numbers;
  }

  if (!values.proteins) {
    errors.proteins = required;
  } else if (isNaN(values.proteins)) {
    errors.proteins = numbers;
  }

  if (!values.carbs) {
    errors.carbs = required;
  } else if (isNaN(values.carbs)) {
    errors.carbs = numbers;
  }

  if (!values.fats) {
    errors.fats = required;
  } else if (isNaN(values.fats)) {
    errors.fats = numbers;
  }

  return errors;
};

export default compose(
  connect(state => ({
    initialValues: {
      calories: state.goals.macros.calories,
      proteins: state.goals.macros.proteins,
      carbs: state.goals.macros.carbs,
      fats: state.goals.macros.fats
    }
  })),
  reduxForm({ validate, form: 'setGoals', enableReinitialize: true })
)(Macros);
