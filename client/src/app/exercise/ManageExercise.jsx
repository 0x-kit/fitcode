import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';
import { reduxForm, reset } from 'redux-form';

import { ComplexForm } from 'app/common/Form.jsx';
import ComplexModal from 'app/common/Modal.jsx';
import { validateNumbers, validateText } from 'app/common/Validation.js';

const modalProps = {
  title: 'Edit your Exercise',
  subtitle: 'Enter name and calories',
  style: { width: 300, textAlign: 'center' }
};

const buttonStyle = { width: 130, marginBottom: 5 };
const inputStyle = { textAlign: 'left', width: 40 };
const lLStyle = { width: '6em', textAlign: 'center' };
const rLStyle = { borderLeftWidth: 0 };

class ManageExercise extends Component {
  state = { deleteProduct: false };

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

  buttons = [
    { content: 'Edit', secondary: true, style: buttonStyle, floated: 'right' },
    { content: 'Delete', secondary: false, style: buttonStyle, floated: 'left', onClick: () => this.handleDelete(true) }
  ];

  handleDelete = flag => this.setState({ deleteProduct: flag });

  handleClose = () => {
    this.handleDelete(false);
    this.props.handleModal(false);
    this.props.dispatch(reset('manageExercise'));
  };

  onSubmit = values => {
    const { selectedExercise } = this.props;
    const { name, calories } = values;

    const newExercise = {
      user: localStorage.getItem('userId'),
      date: moment().format('YYYY-MM-DD'),
      name,
      calories
    };

    if (this.state.deleteProduct === false) {
      this.props.complexEditExercise(selectedExercise._id, newExercise);
    } else {
      this.props.complexDeleteExercise(selectedExercise._id);
    }

    this.handleClose();
  };

  render() {
    const { handleSubmit, openModal } = this.props;

    return (
      <ComplexModal {...modalProps} openModal={openModal} onClose={this.handleClose}>
        <ComplexForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
      </ComplexModal>
    );
  }
}

const validate = ({ calories, name }) => ({ ...validateNumbers({ calories }), ...validateText({ name }) });

export default compose(
  connect(state => ({
    initialValues: {
      name: state.exercise.selectedExercise.name,
      calories: state.exercise.selectedExercise.calories
    }
  })),
  reduxForm({ validate, form: 'manageExercise', enableReinitialize: true })
)(ManageExercise);
