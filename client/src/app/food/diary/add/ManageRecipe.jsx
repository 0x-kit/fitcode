import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";
import { reduxForm, Field, formValueSelector, reset } from "redux-form";
import { Header, Modal, Statistic, Button, Card, Form, Input, Label } from 'semantic-ui-react';

import _ from 'lodash';

import utils from 'app/food/HomeUtils';

class AddRecipe extends Component {
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('addRecipe'));
  };

  onAdd = (values) => {
    const { selectedMeal, selectedRecipe } = this.props;
    const { serving } = values;

    const newRecipe = {
      recipe: selectedRecipe._id,
      serving
    };

    this.props.complexAddDiaryRecipe(selectedMeal.mealId, newRecipe);
    this.handleClose();
  };

  onDelete = () => {
    const { selectedMeal, selectedRecipe } = this.props;

    const newRecipe = {
      recipe: selectedRecipe._id
    };

    this.props.complexDeleteDiaryRecipe(selectedMeal.mealId, newRecipe);
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
            ""
          )}
      </Form.Field>
    );
  };

  renderMacros = (macrosPerRecipe, serving) => {
    const { calories, proteins, carbs, fats } = macrosPerRecipe;
    const labels = ['Calories', 'Proteins', 'Carbs', 'Fats'];
    const terms = [calories, proteins, carbs, fats];

    const renderStatistic = (label, term, index) => <Statistic key={index} value={label} label={_.isNaN(term * serving) ? "" : term * serving} />;
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
    const { selectedRecipe, openModal, deleteRecipe, handleSubmit, serving } = this.props;
    const macrosPerRecipe = utils.macrosPerMeal(selectedRecipe);
    const buttonStyle2 = { width: 272, marginBottom: 10, marginTop: 10 };
    const buttonStyle = { width: 130, marginBottom: 10, marginTop: 10 };
    const modalStyle = { width: 300, textAlign: 'center' };
    const modalTitle = deleteRecipe === false ? 'Add Recipe' : 'Edit Recipe'
    return (
      <Modal style={modalStyle} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader={selectedRecipe.name} content={modalTitle} />
        <Modal.Content>{this.renderMacros(macrosPerRecipe, serving)}</Modal.Content>
        <Modal.Actions>
            <Form onSubmit={handleSubmit(this.onAdd)}>
              <Field
                name="serving"
                component={this.renderField}
                label={{ basic: true, content: "qty" }}
                labelPosition="right"
                placeholder="Enter number of servings..."
                type="text"
                maxLength="7"
              />
              <Button
                style={buttonStyle2}
                size="small"
                compact
                secondary
                content="Add"
                floated="right"
              />
            </Form>
        </Modal.Actions>
      </Modal>
    );
  }
}

const validate = values => {
  const errors = {};
  const required = "Required field";
  const numbers = "This field can only contain numbers";

  if (!values.serving) {
    errors.serving = required;
  } else if (isNaN(values.serving)) {
    errors.serving = numbers;
  }
  return errors;
};

// Selector needed in order to access the value of the 'serving' field of the addProduct form
// This way we can update in real time the macros depending upon serving size
const selector = formValueSelector("addRecipe");

export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedServingSize
    }
  })),
  reduxForm({ validate, form: "addRecipe", enableReinitialize: true }),
  connect(state => ({
    serving: selector(state, "serving")
  }))
)(AddRecipe);