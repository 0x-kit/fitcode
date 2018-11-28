import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { ComplexForm } from 'app/common/Form.jsx';
import ComplexModal from 'app/common/Modal.jsx';
import { validateNumbers, validateText } from 'app/common/Validation.js';

const modalProps = {
  title: 'Add your Exercise',
  subtitle: 'Enter name and calories',
  style: { width: 300, textAlign: 'center' }
};

const buttonStyle = { width: 272, marginBottom: 5 };
const inputStyle = { textAlign: 'left', width: 40 };
const lLStyle = { width: '6em', textAlign: 'center' };
const rLStyle = { borderLeftWidth: 0 };

class CreateExercise extends Component {
  fields = [
    {
      name: 'name',
      formInput: { type: 'text', placeholder: 'Enter name', maxLenght: 15, inputStyle },
      labelRight: { content: '', style: rLStyle },
      labelLeft: { content: 'Name', style: lLStyle }
    },
    {
      name: 'calories',
      formInput: { type: 'number', placeholder: 'Enter calories', maxLenght: 7, inputStyle },
      labelRight: { content: 'kcal' },
      labelLeft: { content: 'Calories', style: lLStyle }
    }
  ];

  buttons = [{ content: 'Add', secondary: true, style: buttonStyle }];

  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('createExercise'));
  };

  onSubmit = values => {
    const { name, calories } = values;
    const newExercise = {
      user: localStorage.getItem('userId'),
      date: this.props.date.format('YYYY-MM-DD'),
      name,
      calories
    };

    this.props.complexAddExercise(newExercise);
    this.handleClose();
  };

  render() {
    const { handleSubmit, openModal } = this.props;

    return (
      <ComplexModal openModal={openModal} onClose={this.handleClose} {...modalProps}>
        <ComplexForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
      </ComplexModal>
    );
  }
}

const validate = ({ calories, name }) => ({ ...validateNumbers({ calories }), ...validateText({ name }) });

export default reduxForm({ validate, form: 'createExercise', enableReinitialize: true })(CreateExercise);
