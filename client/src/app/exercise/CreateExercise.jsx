import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { Header, Modal } from 'semantic-ui-react';
import moment from 'moment';
import ComplexForm from 'app/common/ComplexForm.jsx'
import { validateNumbers, validateText } from 'app/common/Validation.js'

const modalStyle = { width: 300, textAlign: 'center' };
const buttonStyle = { marginBottom: '15px' };
const inputStyle = { textAlign: 'center', width: 40 };
const labelStyle = { width: '6em', textAlign: 'center' }


class CreateExercise extends Component {

  fields = [
    { name: 'name', type: 'text', placeholder: 'Enter name', label: { content: '', basic: 'true'}, labelPosition: 'left', labelInput: 'Name', inputStyle, labelStyle },
    { name: 'calories', type: 'number', placeholder: 'Enter calories', label: { content: 'kcal', pointing: 'left' }, labelPosition: 'right', labelInput: 'Calories', inputStyle, labelStyle },
  ]

  buttons = [
    { content: 'Add', secondary: true, style: buttonStyle }
  ]


  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('createExercise'));
  };

  onSubmit = values => {
    const { name, calories } = values;
    const newExercise = {
      user: localStorage.getItem('userId'),
      date: moment().format('YYYY-MM-DD'),
      name,
      calories
    };

    this.props.complexAddExercise(newExercise);

    this.handleClose();
  };

  render() {
    const { handleSubmit, openModal } = this.props;

    return (
      <Modal style={modalStyle} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader="Enter name and calories" content="Add Your Exercise" />
        <Modal.Actions>
          <ComplexForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
        </Modal.Actions>
      </Modal>
    );
  }
}


const validate = ({ name, calories }) => {
  const errors = { ...validateNumbers('calories', calories), ...validateText('name', name) }
  return errors;
};

export default reduxForm({ validate, form: 'createExercise', enableReinitialize: true })(CreateExercise);
