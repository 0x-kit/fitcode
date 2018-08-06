import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field, reset, formValueSelector } from 'redux-form';
import {
  Header,
  Modal,
  List,
  Input,
  Statistic,
  Form,
  Divider,
  Button,
  Icon,
  Card
} from 'semantic-ui-react';

import HomeUtils from 'app/home/HomeUtils';

class AddProduct extends Component {
  handleClose = () => {
    this.props.handleModal(false);
  };

  onSubmit = values => {
    console.log(values);
    this.handleClose();
    this.props.dispatch(reset('addProduct'));
  };

  renderField = field => {
    return (
      <Input
        fluid
        label={{ basic: true, content: 'g' }}
        labelPosition="right"
        placeholder="Enter weight..."
        type="text"
        {...field.input}
      />
    );
  };

  render() {
    const {
      selectedProduct,
      selectedMeal,
      serving,
      handleSubmit,
      openModal
    } = this.props;

    return (
      <Modal
        style={{ width: 300, textAlign: 'center' }}
        dimmer="blurring"
        open={openModal}
        onClose={this.handleClose}
        size="mini"
      >
        <Header subheader={selectedProduct.name} content="Add Food" />
        <Modal.Content>
          <Card.Group centered>{Macros(selectedProduct, serving)}</Card.Group>
        </Modal.Content>
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field name="serving" component={this.renderField} />
            <Divider />
            <Button
              style={{ marginBottom: 10 }}
              primary
              content="Add it"
              floated="right"
            />
          </Form>
        </Modal.Actions>
      </Modal>
    );
  }
}

const Macros = (product, serving) => {
  const { calories, proteins, carbs, fats } = product;

  return (
    <Statistic.Group className="prueba">
      <Statistic>
        <Statistic.Value>Calories</Statistic.Value>
        <Statistic.Label>
          {isNaN(HomeUtils.per(calories, serving))
            ? ''
            : HomeUtils.per(calories, serving)}
        </Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>Proteins</Statistic.Value>
        <Statistic.Label>
          {isNaN(HomeUtils.per(proteins, serving))
            ? ''
            : HomeUtils.per(proteins, serving)}
        </Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>Carbs</Statistic.Value>
        <Statistic.Label>
          {isNaN(HomeUtils.per(carbs, serving))
            ? ''
            : HomeUtils.per(carbs, serving)}
        </Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>Fats</Statistic.Value>
        <Statistic.Label>
          {isNaN(HomeUtils.per(fats, serving))
            ? ''
            : HomeUtils.per(fats, serving)}
        </Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};

// Selector needed in order to access the value of the 'serving' field of the addProduct form
// This way we can update in real time the macros depending upon serving size
const selector = formValueSelector('addProduct');

export default compose(
  reduxForm({ form: 'addProduct' }),
  connect(state => ({
    serving: selector(state, 'serving')
  }))
)(AddProduct);
