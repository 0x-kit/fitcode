import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import ComplexModal from 'app/common/Modal.jsx';
import { ComplexForm } from 'app/common/Form.jsx';
import { validateText } from 'app/common/Validation.js';

const modalProps = {
  title: 'Create Your Recipe',
  subtitle: 'Enter the name',
  style: { width: 300, textAlign: 'center' }
};

const inputStyle = { textAlign: 'center', width: 70 };
const buttonStyle = { marginBottom: 5, width: 272 };

const lLStyle = { width: '5.1em', textAlign: 'center' };
const rLStyle2 = { width: '0em', textAlign: 'center', borderLeftWidth: 0 };

class CreateRecipe extends Component {
  fields = [
    {
      name: 'name',
      formInput: { type: 'text', placeholder: 'Enter name', maxLenght: 15, inputStyle },
      labelRight: { content: '', style: rLStyle2 },
      labelLeft: { content: 'Name', style: lLStyle }
    }
  ];

  buttons = [{ content: 'Create', secondary: true, style: buttonStyle }];

  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('createRecipe'));
  };

  onSubmit = values => {
    const { name } = values;
    const newRecipe = {
      user: localStorage.getItem('userId'),
      name
    };

    this.props.complexCreateRecipe(newRecipe);
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

const validate = values => ({ ...validateText(values) });

export default reduxForm({
  validate,
  form: 'createRecipe',
  enableReinitialize: true
})(CreateRecipe);
