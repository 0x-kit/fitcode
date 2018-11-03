import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, reset } from 'redux-form';
import ComplexModal from 'app/common/Modal.jsx';
import { ComplexForm } from 'app/common/Form.jsx';
import { validateNumbers, validateText } from 'app/common/Validation.js';

const modalProps = {
  title: 'Edit Your Food"',
  subtitle: 'Enter the nutritional info',
  style: { width: 300, textAlign: 'center' }
};

const inputStyle = { textAlign: 'left', width: 70 };
const buttonStyle = { width: 130, marginBottom: 5 };

const lLStyle = { width: '5.1em', textAlign: 'center' };
const rLStyle = { width: '3.2em', textAlign: 'center' };
const rLStyle2 = { width: '0em', textAlign: 'center', borderLeftWidth: 0 };

class ManageFood extends Component {
  state = { deleteProduct: false };

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

  buttons = [
    { content: 'Edit', secondary: true, style: buttonStyle, floated: 'right' },
    { content: 'Delete', secondary: false, style: buttonStyle, floated: 'left', onClick: () => this.handleDelete(true) }
  ];

  handleDelete = flag => this.setState({ deleteProduct: flag });

  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('manageFood'));
  };

  onSubmit = values => {
    const { selectedProduct } = this.props;

    const { name, brand, calories, proteins, carbs, fats } = values;

    let newProduct = {
      name,
      brand,
      calories,
      proteins,
      carbs,
      fats
    };

    if (this.state.deleteProduct === false) {
      this.props.complexEditPersonalProduct(selectedProduct._id, newProduct);
    } else {
      newProduct.user = null;
      this.props.complexDeletePersonalProduct(selectedProduct._id);
    }
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

export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedGrams,
      name: state.food.selectedProduct.name,
      brand: state.food.selectedProduct.brand,
      calories: state.food.selectedProduct.calories,
      proteins: state.food.selectedProduct.proteins,
      carbs: state.food.selectedProduct.carbs,
      fats: state.food.selectedProduct.fats
    }
  })),
  reduxForm({ validate, form: 'manageFood', enableReinitialize: true })
)(ManageFood);
