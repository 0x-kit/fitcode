import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, reset, formValueSelector } from 'redux-form';
import { Statistic, Card } from 'semantic-ui-react';
import transform from 'app/common/Transformations';
import _ from 'lodash';
import ComplexModal from 'app/common/Modal.jsx';
import { ComplexForm } from 'app/common/Form.jsx';
import { validateNumbers } from 'app/common/Validation.js';

const inputStyle = { textAlign: 'center', width: 70 };
const buttonStyle = { width: 272, marginBottom: 5 };
const lLStyle = { width: '6em', textAlign: 'center' };
const rLStyle = { borderLeftWidth: 0 };

class AddFood extends Component {
  fields = [
    {
      name: 'serving',
      formInput: { type: 'number', placeholder: 'Weight', maxLenght: 7, inputStyle },
      labelRight: { content: 'g', style: rLStyle },
      labelLeft: { content: 'Weight', style: lLStyle }
    }
  ];
  buttons = [{ content: 'Add', secondary: true, style: buttonStyle }];

  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('addDiaryProduct'));
  };

  onSubmit = values => {
    const { selectedProduct, selectedMeal, selectedRecipe } = this.props;

    const newProduct = {
      product: selectedProduct._id,
      grams: values.serving
    };

    if (!_.isEmpty(selectedMeal)) {
      this.props.complexAddDiaryProduct(selectedMeal.mealId, newProduct);
    } else if (!_.isEmpty(selectedRecipe)) {
      this.props.complexAddRecipeProduct(selectedRecipe, newProduct);
    }

    this.handleClose();
  };

  renderMacros = ({ calories, proteins, carbs, fats }, serving) => {
    const labels = ['Calories', 'Proteins', 'Carbs', 'Fats'];
    const terms = [calories, proteins, carbs, fats];

    const renderStatistic = (label, term, serving, index) => (
      <Statistic
        key={index}
        value={label}
        label={isNaN(transform.per(term, serving)) ? '' : transform.per(term, serving)}
      />
    );
    return (
      <Card.Group centered>
        <Statistic.Group className="prueba">
          {labels.map((label, index) => renderStatistic(label, terms[index], serving, index))}
        </Statistic.Group>
      </Card.Group>
    );
  };

  render() {
    const { selectedProduct, serving, handleSubmit, openModal } = this.props;
    const modalProps = {
      title: 'Add Food',
      subtitle: selectedProduct.name,
      style: { width: 300, textAlign: 'center' },
      content: this.renderMacros(selectedProduct, serving)
    };
    return (
      <ComplexModal openModal={openModal} onClose={this.handleClose} {...modalProps}>
        <ComplexForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
      </ComplexModal>
    );
  }
}

const validate = values => ({ ...validateNumbers(values) });
const selector = formValueSelector('addDiaryProduct');

export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedGrams
    }
  })),
  reduxForm({ validate, form: 'addDiaryProduct', enableReinitialize: true }),
  connect(state => ({
    serving: selector(state, 'serving')
  }))
)(AddFood);
