import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, reset } from 'redux-form';
import ComplexModal from 'app/common/Modal.jsx';
import { validateNumbers } from 'app/common/Validation.js';
import { ComplexForm } from 'app/common/Form.jsx';

const modalProps = {
  title: 'Edit Your Macros',
  subtitle: 'Enter your diet requirements',
  style: { width: 300, textAlign: 'center' }
};

const inputStyle = { textAlign: 'center', width: 70 };
const buttonStyle = { marginBottom: 5, width: 272 };

const lLStyle = { width: '5.1em', textAlign: 'center' };
const rLStyle = { width: '3.3em', textAlign: 'center' };

class ManageMacros extends Component {
  fields = [
    {
      name: 'calories',
      formInput: { type: 'number', placeholder: 'Calories', maxLenght: 7, inputStyle },
      labelRight: { content: 'kcal', style: rLStyle },
      labelLeft: { content: 'Calories', style: lLStyle }
    },
    {
      name: 'proteins',
      formInput: { type: 'number', placeholder: 'Proteins', maxLenght: 7, inputStyle },
      labelRight: { content: 'g', style: rLStyle },
      labelLeft: { content: 'Proteins', style: lLStyle }
    },
    {
      name: 'carbs',
      formInput: { type: 'number', placeholder: 'Carbs', maxLenght: 7, inputStyle },
      labelRight: { content: 'g', style: rLStyle },
      labelLeft: { content: 'Carbs', style: lLStyle }
    },
    {
      name: 'fats',
      formInput: { type: 'number', placeholder: 'Fats', maxLenght: 7, inputStyle },
      labelRight: { content: 'g', style: rLStyle },
      labelLeft: { content: 'Fats', style: lLStyle }
    }
  ];

  buttons = [{ content: 'Update', secondary: true, style: buttonStyle }];

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
      calories: state.goals.macros.calories,
      proteins: state.goals.macros.proteins,
      carbs: state.goals.macros.carbs,
      fats: state.goals.macros.fats
    }
  })),
  reduxForm({ validate, form: 'manageMacros', enableReinitialize: true })
)(ManageMacros);
