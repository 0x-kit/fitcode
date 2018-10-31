import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, reset } from 'redux-form';
import { Header, Modal } from 'semantic-ui-react';
import ComplexForm from 'app/common/ComplexForm.jsx'
import { validateNumbers } from 'app/common/Validation.js'

const buttonStyle = { marginTop: '15px', marginBottom: '15px', width: '275px' };
const inputStyle = { textAlign: 'center', width: 70 };
const modalStyle = { width: 300, textAlign: 'center' };
const labelStyle = { width: '11em', textAlign: 'center' }


class ManageWeight extends Component {
  fields = [
    { name: 'currentWeight', type: 'number', placeholder: 'Enter your current weight', label: { content: 'kg', pointing: 'left' }, labelPosition: 'right', maxLength: 7, labelInput: 'Current Weight', inputStyle, labelStyle },
    { name: 'goalWeight', type: 'number', placeholder: 'Enter your weight goal', label: { content: 'kg', pointing: 'left' }, labelPosition: 'right', maxLength: 7, labelInput: 'Weight Goal', inputStyle, labelStyle },
  ]

  buttons = [
    { content: 'Update', secondary: true, style: buttonStyle }
  ]

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
      <Modal style={modalStyle} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader="Enter your weights" content="Edit Your Weights " />
        <Modal.Actions>
          <ComplexForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default compose(
  connect(state => ({
    initialValues: {
      goalWeight: state.goals.goalWeight.weight,
      currentWeight: state.goals.currentWeight.weight
    }
  })),
  reduxForm({ validate: validateNumbers, form: 'setWeight', enableReinitialize: true })
)(ManageWeight);
