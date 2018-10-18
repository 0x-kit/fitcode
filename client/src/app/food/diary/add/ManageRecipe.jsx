import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field, formValueSelector, reset } from 'redux-form';
import { Header, Modal, Statistic, Button, Card, Form, Input, Label } from 'semantic-ui-react';

import _ from 'lodash';

import utils from 'app/food/HomeUtils';

class ManageRecipes extends Component {
  state = { deleteRecipe: false };

  handleDelete = flag => {
    this.setState({ deleteRecipe: flag });
  };

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

  renderField = field => {
    const {
      placeholder,
      label,
      labelPosition,
      maxLength,
      type,
      meta: { touched, error }
    } = field;

    let validateError = false;

    if (touched && error) {
      validateError = true;
    }
    return (
      <Form.Field>
        <Input
          fluid
          labelPosition={labelPosition}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          {...field.input}
        >
          <input style={{ textAlign: 'center', width: 70 }} />
          <Label basic>{label.content}</Label>
        </Input>
        {validateError ? (
          <Header as="label" color="red" size="tiny" textAlign="center">
            {error}
          </Header>
        ) : (
          ''
        )}
      </Form.Field>
    );
  };

  renderMacros = (macrosPerRecipe, serving) => {
    const { calories, proteins, carbs, fats } = macrosPerRecipe;
    const labels = ['Calories', 'Proteins', 'Carbs', 'Fats'];
    const terms = [calories, proteins, carbs, fats];

    const renderStatistic = (label, term, index) => (
      <Statistic key={index} value={label} label={_.isNaN(term * serving) ? '' : term * serving} />
    );
    return (
      <Card.Group centered>
        <Statistic.Group className="prueba">
          {labels.map((label, index) => {
            return renderStatistic(label, terms[index], index);
          })}
        </Statistic.Group>
      </Card.Group>
    );
  };

  render() {
    const { selectedRecipe, openModal, handleSubmit, serving } = this.props;

    const macrosPerRecipe = utils.macrosPerMeal(selectedRecipe);
    const buttonStyle = { width: 130, marginBottom: 10, marginTop: 10 };
    const modalStyle = { width: 300, textAlign: 'center' };

    return (
      <Modal style={modalStyle} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader={selectedRecipe.name} content={'Edit Recipe'} />
        <Modal.Content>{this.renderMacros(macrosPerRecipe, serving)}</Modal.Content>
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="serving"
              component={this.renderField}
              label={{ basic: true, content: 'qty' }}
              labelPosition="right"
              placeholder="Enter number of servings..."
              type="text"
              maxLength="7"
            />
            <Button style={buttonStyle} size="tiny" compact secondary content="Edit" floated="right" />
            <Button
              style={buttonStyle}
              size="tiny"
              content="Delete"
              floated="left"
              onClick={() => {
                this.handleDelete(true);
              }}
            />
          </Form>
        </Modal.Actions>
      </Modal>
    );
  }
}

const validate = values => {
  const errors = {};
  const required = 'Required field';
  const numbers = 'This field can only contain numbers';

  if (!values.serving) {
    errors.serving = required;
  } else if (isNaN(values.serving)) {
    errors.serving = numbers;
  }
  return errors;
};

// Selector needed in order to access the value of the 'serving' field of the addProduct form
// This way we can update in real time the macros depending upon serving size
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
