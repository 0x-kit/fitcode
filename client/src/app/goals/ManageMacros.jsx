import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, reset } from 'redux-form';
import { Header, Modal } from 'semantic-ui-react';

import ComplexForm from 'app/common/ComplexForm.jsx';
import { validateNumbers } from 'app/common/Validation.js';

const modalStyle = { width: 300, textAlign: 'center' };
const inputStyle = { textAlign: 'center', width: 70 };
const buttonStyle = { marginTop: '15px', marginBottom: '15px', width: '275px' };
const labelStyle = { width: '5.1em', textAlign: 'center' }
const labelStyleContent = { width: '3.3em', textAlign: 'center' }

class ManageMacros extends Component {
  fields = [
    { name: 'calories', type: 'number', placeholder: 'Calories', label: { content: 'kcal' }, labelPosition: 'right', maxLength: 7, labelInput: 'Calories', inputStyle, labelStyle, labelStyleContent },
    { name: 'proteins', type: 'number', placeholder: 'Proteins', label: { content: 'g' }, labelPosition: 'right', maxLength: 7, labelInput: 'Proteins', inputStyle, labelStyle, labelStyleContent },
    { name: 'carbs', type: 'number', placeholder: 'Carbs', label: { content: 'g' }, labelPosition: 'right', maxLength: 7, labelInput: 'Carbs', inputStyle, labelStyle, labelStyleContent },
    { name: 'fats', type: 'number', placeholder: 'Fats', label: { content: 'g' }, labelPosition: 'right', maxLength: 7, labelInput: 'Fats', inputStyle, labelStyle, labelStyleContent },
  ];

  buttons = [
    { content: 'Update', secondary: true, style: buttonStyle }
  ];

  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('manageMacros'));
  };

  onSubmit = macros => {
    this.props.handleClose();
    this.props.complexEditMacros(macros);
  };

  render() {
    const { handleSubmit } = this.props;
    const { openModal } = this.props;

    return (
      <Modal style={modalStyle} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader="Enter your diet requirements" content="Edit Your Macros" />
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
      calories: state.goals.macros.calories,
      proteins: state.goals.macros.proteins,
      carbs: state.goals.macros.carbs,
      fats: state.goals.macros.fats
    }
  })),
  reduxForm({ validate: validateNumbers, form: 'manageMacros', enableReinitialize: true })
)(ManageMacros);
