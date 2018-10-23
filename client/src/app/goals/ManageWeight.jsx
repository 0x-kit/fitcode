import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field, reset } from 'redux-form';
import { Header, Modal, Input, Form, Button, Label, Card } from 'semantic-ui-react';

class ManageWeight extends Component {
  onSubmit = values => {
    const { goalWeight, currentWeight } = values;

    if (this.props.goalWeight.weight !== goalWeight) {
      const newGoalWeight = { weight: goalWeight };
      this.props.complexEnterGoalWeight(newGoalWeight);
    }

    if (this.props.currentWeight.weight !== currentWeight) {
      const newCurrentWeight = {
        date: this.props.format('YYYY-MM-DD'),
        weight: currentWeight
      };
      this.props.complexEnterCurrentWeight(newCurrentWeight);
    }

    this.props.handleModal(false);
  };

  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('setWeight'));
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
          <Label className="weightLabel" basic>
            {labelInput}
          </Label>
          <input style={{ textAlign: 'center', width: 70 }} />
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
    const buttonStyle = { marginTop: '15px', marginBottom: '15px', width: '300px', height: '200' };
    const { handleSubmit } = this.props;
    const { openModal } = this.props;
    return (
      <Modal style={{ width: 300, textAlign: 'center' }} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader="Enter your weights" content="Edit Your Weights " style={{ height: 100 }} />
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="currentWeight"
              component={this.renderField}
              label={{ content: 'kg', pointing: 'left' }}
              labelPosition="right"
              placeholder="Enter your current weight..."
              type="number"
              maxLength="7"
              labelInput="Current Weight"
            />
            <Field
              name="goalWeight"
              component={this.renderField}
              label={{ content: 'kg', pointing: 'left' }}
              labelPosition="right"
              placeholder="Enter your goal weight..."
              type="number"
              maxLength="7"
              labelInput="Goal Weight"
            />

            <Card.Group centered>
              <Button content="Update" secondary style={buttonStyle} />
            </Card.Group>
          </Form>
        </Modal.Actions>
      </Modal>
    );
  }
}

const validate = values => {
  const errors = {};
  const required = 'Required field';
  const numbers = 'This field can only contain numbers';
  const negative = 'This field cant contain negative values';

  if (!values.goalWeight) {
    errors.goalWeight = required;
  } else if (isNaN(values.goalWeight)) {
    errors.goalWeight = numbers;
  } else if (values.goalWeight < 0) {
    errors.goalWeight = negative;
  }

  if (!values.currentWeight) {
    errors.currentWeight = required;
  } else if (isNaN(values.currentWeight)) {
    errors.currentWeight = numbers;
  } else if (values.currentWeight < 0) {
    errors.currentWeight = negative;
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
)(ManageWeight);
