import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, formValueSelector, reset } from 'redux-form';
import { Statistic, Card } from 'semantic-ui-react';
import _ from 'lodash';
import transform from 'app/common/Transformations';

import ComplexModal from 'app/common/Modal.jsx';
import { ComplexForm } from 'app/common/Form.jsx';
import { validateNumbers } from 'app/common/Validation.js';

const inputStyle = { textAlign: 'center', width: 70 };
const buttonStyle = { width: 272, marginBottom: 5 };
const lLStyle = { width: '5.9em', textAlign: 'center' };
const rLStyle = { borderLeftWidth: 0 };

class AddRecipe extends Component {
  state = { deleteRecipe: false };
  fields = [
    {
      name: 'serving',
      formInput: { type: 'number', placeholder: 'Weight', maxLenght: 7, inputStyle },
      labelRight: { content: '', style: rLStyle },
      labelLeft: { content: '#Servings', style: lLStyle }
    }
  ];
  buttons = [{ content: 'Add', secondary: true, style: buttonStyle }];
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('addRecipeToDiary'));
  };

  onSubmit = values => {
    const { selectedMeal, selectedRecipe } = this.props;
    const { serving } = values;

    const newRecipe = {
      recipe: selectedRecipe._id,
      serving
    };

    this.props.complexAddDiaryRecipe(selectedMeal.mealId, newRecipe);
    this.handleClose();
  };

  renderMacros = ({ calories, proteins, carbs, fats }, serving) => {
    const labels = ['Calories', 'Proteins', 'Carbs', 'Fats'];
    const terms = [calories, proteins, carbs, fats];

    const renderStatistic = (label, term, index) => (
      <Statistic key={index} value={label} label={_.isNaN(term * serving) ? '' : term * serving} />
    );
    return (
      <Card.Group centered>
        <Statistic.Group className="prueba">
          {labels.map((label, index) => renderStatistic(label, terms[index], index))}
        </Statistic.Group>
      </Card.Group>
    );
  };
  render() {
    const { selectedRecipe, openModal, handleSubmit, serving } = this.props;
    const macrosPerRecipe = transform.reduceMacros(selectedRecipe.products);
    const modalProps = {
      title: 'Add Recipe',
      subtitle: selectedRecipe.name,
      style: { width: 300, textAlign: 'center' },
      content: this.renderMacros(macrosPerRecipe, serving)
    };

    return (
      <ComplexModal openModal={openModal} onClose={this.handleClose} {...modalProps}>
        <ComplexForm handleSubmit={handleSubmit(this.onSubmit)} fields={this.fields} buttons={this.buttons} />
      </ComplexModal>
    );
  }
}

const validate = values => ({ ...validateNumbers(values) });
const selector = formValueSelector('addRecipeToDiary');

export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedServingSize
    }
  })),
  reduxForm({ validate, form: 'addRecipeToDiary', enableReinitialize: true }),
  connect(state => ({
    serving: selector(state, 'serving')
  }))
)(AddRecipe);
