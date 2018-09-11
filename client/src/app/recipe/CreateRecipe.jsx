import React, { Component } from "react";
import { reduxForm, Field, reset } from "redux-form";
import { Header, Modal, Input, Form, Button } from "semantic-ui-react";

class CreateRecipe extends Component {
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset("createRecipe"));
  };

  onSubmit = values => {
    const { name } = values;
    const newRecipe = {
      user: localStorage.getItem("userId"),
      name
    };

    this.props.complexAddRecipe(newRecipe);
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
    const buttonStyle = { marginBottom: 10, width: 322 };
    return (
      <Modal
        style={{ width: 350, textAlign: "center" }}
        open={openModal}
        onClose={this.handleClose}
        size="mini"
      >
        <Header subheader="Enter name" content="Create Your Recipe" />
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="name"
              component={this.renderField}
              label={{
                basic: true,
                content: "Name",
                className: "createExercise"
              }}
              labelPosition="left"
              placeholder="Enter name..."
            />
            <Button
              style={buttonStyle}
              size="small"
              secondary
              content="Create"
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

  if (!values.name) {
    errors.name = required;
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters length"';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: "createRecipe",
  enableReinitialize: true
})(CreateRecipe);
