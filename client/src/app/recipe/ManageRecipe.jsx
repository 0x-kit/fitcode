import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { reduxForm, Field, formValueSelector, reset } from "redux-form";
import {
  Header,
  Modal,
  Input,
  Statistic,
  Form,
  Button,
  Card
} from "semantic-ui-react";

import HomeUtils from "app/food/HomeUtils";

class ManageRecipe extends Component {
  state = { deleteProduct: false };

  handleDelete = flag => {
    this.setState({ deleteProduct: flag });
  };

  handleClose = () => {
    this.handleDelete(false);
    this.props.handleModal(false);
    this.props.dispatch(reset("manageRecipeProduct"));
  };

  onSubmit = values => {
    const { selectedProduct, selectedRecipe } = this.props;

    const newProduct = {
      product: selectedProduct._id,
      grams: values.serving
    };

    if (this.state.deleteProduct === false) {
      this.props.complexEditRecipeProduct(selectedRecipe, newProduct);
    } else {
      this.props.complexDeleteRecipeProduct(selectedRecipe, newProduct);
    }

    this.handleClose();
  };

  renderMacros = (product, serving) => {
    const { calories, proteins, carbs, fats } = product;
    const labels = ["Calories", "Proteins", "Carbs", "Fats"];
    const terms = [calories, proteins, carbs, fats];

    const renderStatistic = (label, term, serving, index) => (
      <Statistic
        key={index}
        value={label}
        label={
          isNaN(HomeUtils.per(term, serving))
            ? ""
            : HomeUtils.per(term, serving)
        }
      />
    );
    return (
      <Card.Group centered>
        <Statistic.Group className="prueba">
          {labels.map((label, index) => {
            return renderStatistic(label, terms[index], serving, index);
          })}
        </Statistic.Group>
      </Card.Group>
    );
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
          label={label}
          labelPosition={labelPosition}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          {...field.input}
        />
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

  render() {
    const { selectedProduct, serving, handleSubmit, openModal } = this.props;

    const buttonStyle = { width: 130, marginBottom: 10, marginTop: 10 };
    const modalStyle = { width: 300, textAlign: "center" };
    return (
      <Modal
        style={modalStyle}
        open={openModal}
        onClose={this.handleClose}
        size="mini"
      >
        <Header subheader={selectedProduct.name} content="Edit Food" />
        <Modal.Content>
          {this.renderMacros(selectedProduct, serving)}
        </Modal.Content>
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="serving"
              component={this.renderField}
              label={{ basic: true, content: "g" }}
              labelPosition="right"
              placeholder="Enter weight..."
              type="text"
              maxLength="7"
            />

            <Button
              style={buttonStyle}
              size="tiny"
              secondary
              content="Edit"
              floated="right"
            />
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
  const required = "Required field";
  const numbers = "This field can only contain numbers";

  if (!values.serving) {
    errors.serving = required;
  } else if (isNaN(values.serving)) {
    errors.serving = numbers;
  }
  return errors;
};

// Selector needed in order to access the value of the 'serving' field of the editProduct form
// This way we can update in real time the macros depending upon serving size
const selector = formValueSelector("manageRecipeProduct");

// The order matters
export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedGrams
    }
  })),
  reduxForm({
    validate,
    form: "manageRecipeProduct",
    enableReinitialize: true
  }),
  connect(state => ({
    serving: selector(state, "serving")
  }))
)(ManageRecipe);
