import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, reset } from 'redux-form';

import { validateNumbers } from 'app/common/Validation.js';
import { ComplexForm } from 'app/common/Form.jsx';
import ComplexModal from 'app/common/Modal.jsx';

const modalProps = {
  title: 'Edit Your Weights',
  subtitle: 'Enter your current weight or weight goal',
  style: { width: 300, textAlign: 'center' }
};

const buttonStyle = { marginBottom: 5, width: 272 };
const inputStyle = { textAlign: 'center', width: 70 };
const lLStyle = { width: '11em', textAlign: 'center' };

class ManageWeight extends Component {
  fields = [
    {
      name: 'currentWeight',
      formInput: { type: 'number', placeholder: 'Enter your current weight', maxLenght: 7, inputStyle },
      labelRight: { content: 'kg' },
      labelLeft: { content: 'Current Weight', style: lLStyle }
    },
    {
      name: 'goalWeight',
      formInput: { type: 'number', placeholder: 'Enter your weight goal', maxLenght: 7, inputStyle },
      labelRight: { content: 'kg' },
      labelLeft: { content: 'Weight Goal', style: lLStyle }
    }
  ];

  buttons = [{ content: 'Update', secondary: true, style: buttonStyle }];

  onSubmit = values => {
    const { goalWeight, currentWeight } = values;

    if (this.props.goalWeight.weight !== goalWeight) {
      const newGoalWeight = { weight: goalWeight };
      this.props.complexEnterGoalWeight(newGoalWeight);
    }

    if (this.props.currentWeight.weight !== currentWeight) {
      const newCurrentWeight = {
        date: this.props.date.format('YYYY-MM-DD'),
        weight: currentWeight
      };

      this.props.complexEnterCurrentWeight(
        newCurrentWeight,
        this.props.date.format('YYYY-MM-DD').concat('T00:00:00.000Z')
      );
    }

    this.handleClose();
  };

  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('setWeight'));
  };

  render() {
    const { handleSubmit } = this.props;
    const { openModal } = this.props;

    return (
      <ComplexModal openModal={openModal} onClose={this.handleClose} {...modalProps}>
        <ComplexForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
      </ComplexModal>
    );
  }
}
const validate = values => ({ ...validateNumbers(values) });

export default compose(
  connect(state => ({
    initialValues: {
      goalWeight: state.goals.goalWeight.weight,
      currentWeight: state.goals.currentWeight.weight
    }
  })),
  reduxForm({ validate, form: 'setWeight', enableReinitialize: true })
)(ManageWeight);
