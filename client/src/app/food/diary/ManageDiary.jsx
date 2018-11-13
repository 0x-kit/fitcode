import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, formValueSelector, reset } from 'redux-form';
import { Statistic, Card } from 'semantic-ui-react';
import transform from 'app/common/Transformations';
import ComplexModal from 'app/common/Modal.jsx';
import { ComplexForm } from 'app/common/Form.jsx';
import { validateNumbers } from 'app/common/Validation.js';

const inputStyle = { textAlign: 'center', width: 70 };
const buttonStyle = { width: 130, marginBottom: 5 };

const lLStyle = { width: '5.1em', textAlign: 'center' };
const rLStyle = { width: '3.2em', textAlign: 'center' };

class ManageDiary extends Component {
  state = { deleteProduct: false };
  fields = [
    {
      name: 'serving',
      formInput: { type: 'number', placeholder: 'Weight', maxLenght: 7, inputStyle },
      labelRight: { content: 'g', style: rLStyle },
      labelLeft: { content: 'Weight', style: lLStyle }
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
    this.props.dispatch(reset('manageDiaryProduct'));
  };

  onSubmit = values => {
    const { selectedProduct, selectedMeal } = this.props;

    const newProduct = {
      product: selectedProduct._id,
      grams: values.serving
    };

    if (this.state.deleteProduct === false) {
      this.props.complexEditDiaryProduct(selectedMeal.mealId, newProduct);
    } else {
      this.props.complexDeleteDiaryProduct(selectedMeal.mealId, newProduct);
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
      title: 'Edit Your Food',
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
// Selector needed in order to access the value of the 'serving' field of the editProduct form
// This way we can update in real time the macros depending upon serving size
const selector = formValueSelector('manageDiaryProduct');

// The order matters
export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedGrams
    }
  })),
  reduxForm({
    validate,
    form: 'manageDiaryProduct',
    enableReinitialize: true
  }),
  connect(state => ({
    serving: selector(state, 'serving')
  }))
)(ManageDiary);
