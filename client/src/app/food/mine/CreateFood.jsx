import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import ComplexModal from 'app/common/Modal.jsx';
import { ComplexForm } from 'app/common/Form.jsx';
import { validateNumbers, validateText } from 'app/common/Validation.js';

const modalProps = {
  title: 'Create Your Food',
  subtitle: 'Enter the nutritional info',
  style: { width: 300, textAlign: 'center' }
};

const inputStyle = { textAlign: 'center', width: 70 };
const buttonStyle = { marginBottom: 5, width: 272 };

const lLStyle = { width: '5.1em', textAlign: 'center' };
const rLStyle = { width: '3.2em', textAlign: 'center' };
const rLStyle2 = { width: '0em', textAlign: 'center', borderLeftWidth: 0 };

class CreateFood extends Component {
  fields = [
    {
      name: 'name',
      formInput: { type: 'text', placeholder: 'Enter name', maxLenght: 15, inputStyle },
      labelRight: { content: '', style: rLStyle2 },
      labelLeft: { content: 'Name', style: lLStyle }
    },
    {
      name: 'brand',
      formInput: { type: 'text', placeholder: 'Enter brand', maxLenght: 15, inputStyle },
      labelRight: { content: '', style: rLStyle2 },
      labelLeft: { content: 'Brand', style: lLStyle }
    },
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

  buttons = [{ content: 'Create', secondary: true, style: buttonStyle }];
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('createFood'));
  };

  onSubmit = values => {
    const { name, brand, calories, proteins, carbs, fats } = values;
    const newProduct = {
      name,
      brand,
      calories,
      proteins,
      carbs,
      fats,
      user: localStorage.getItem('userId')
    };
    this.props.complexAddPersonalProduct(newProduct);

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

const validate = ({ name, brand, calories, proteins, carbs, fats }) => ({
  ...validateNumbers({ calories, proteins, carbs, fats }),
  ...validateText({ name, brand })
});

export default reduxForm({ validate, form: 'createFood', enableReinitialize: true })(CreateFood);
