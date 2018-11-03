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
const buttonStyle = { width: 130, marginBottom: 5 };

const lLStyle = { width: '5.9em', textAlign: 'center' };
const rLStyle = { borderLeftWidth: 0 };

class ManageRecipes extends Component {
  state = { deleteRecipe: false };
  fields = [
    {
      name: 'serving',
      formInput: { type: 'number', placeholder: 'Weight', maxLenght: 7, inputStyle },
      labelRight: { content: '', style: rLStyle },
      labelLeft: { content: '#Servings', style: lLStyle }
    }
  ];
  buttons = [
    { content: 'Edit', secondary: true, style: buttonStyle, floated: 'right' },
    { content: 'Delete', secondary: false, style: buttonStyle, floated: 'left', onClick: () => this.handleDelete(true) }
  ];

  handleDelete = flag => this.setState({ deleteRecipe: flag });

  handleClose = () => {
    this.handleDelete(false);
    this.props.handleModal(false);
    this.props.dispatch(reset('manageRecipes'));
  };

  onSubmit = values => {
    const { selectedMeal, selectedRecipe } = this.props;
    const { serving } = values;

    const newRecipe = {
      recipe: selectedRecipe._id,
      serving
    };

    if (this.state.deleteRecipe === false) {
      this.props.complexEditDiaryRecipe(selectedMeal.mealId, newRecipe);
    } else {
      this.props.complexDeleteDiaryRecipe(selectedMeal.mealId, newRecipe);
    }

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
      title: 'Edit Recipe',
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
const selector = formValueSelector('manageRecipes');

export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedServingSize
    }
  })),
  reduxForm({ validate, form: 'manageRecipes', enableReinitialize: true }),
  connect(state => ({
    serving: selector(state, 'serving')
  }))
)(ManageRecipes);
