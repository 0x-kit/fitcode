import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from "moment";
import { reduxForm, Field, reset } from "redux-form";
import { Header, Modal, Input, Form, Button } from "semantic-ui-react";

class ManageFood extends Component {
  state = { deleteProduct: false };

  handleDelete = flag => this.setState({ deleteProduct: flag });

  handleClose = () => {
    this.handleDelete(false);
    this.props.handleModal(false);
    this.props.dispatch(reset("manageExercise"));
  };

  onSubmit = values => {
    const { selectedExercise } = this.props;
    const { name, calories } = values;

    const newExercise = {
      user: localStorage.getItem("userId"),
      date: moment().format("YYYY-MM-DD"),
      name,
      calories
    };

    if (this.state.deleteProduct === false) {
      this.props.complexEditExercise(selectedExercise._id, newExercise);
    } else {
      this.props.complexDeleteExercise(selectedExercise._id);
    }

    this.handleClose();
  };

  renderField = field => {
    const {
      placeholder,
      label,
      labelPosition,
      maxLength,
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
          type="text"
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
    const { handleSubmit, openModal } = this.props;
    const buttonStyle = { width: 155, marginBottom: 10, marginTop: 10 };
    return (
      <Modal
        style={{ width: 350, textAlign: "center" }}
        open={openModal}
        onClose={this.handleClose}
        size="mini"
        dimmer="blurring"
      >
        <Header
          subheader="Enter name and calories"
          content="Edit Your Exercise"
        />
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="name"
              component={this.renderField}
              label={{ basic: true, content: "Name", className: "createFood" }}
              labelPosition="left"
              placeholder="Enter name..."
            />

            <Field
              name="calories"
              component={this.renderField}
              label={{
                basic: true,
                content: "Calories",
                className: "createFood"
              }}
              labelPosition="left"
              placeholder="Enter calories..."
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

  if (!values.name) {
    errors.name = required;
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters length"';
  }

  if (!values.calories) {
    errors.calories = required;
  } else if (isNaN(values.calories)) {
    errors.calories = numbers;
  }

  return errors;
};

export default compose(
  connect(state => ({
    initialValues: {
      name: state.exercise.selectedExercise.name,
      calories: state.exercise.selectedExercise.calories
    }
  })),
  reduxForm({ validate, form: "manageExercise", enableReinitialize: true })
)(ManageFood);
