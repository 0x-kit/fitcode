import React, { Component } from 'react';
import ManageFood from 'app/food/mine/ManageFood.jsx';
import CreateFood from 'app/food/mine/CreateFood.jsx';
import _ from 'lodash';
import { Card, List, Header, Responsive, Container, Segment, Button } from 'semantic-ui-react';

class MineFood extends Component {
  state = { manageModal: false, createModal: false };

  handleManageModal = flag => this.setState({ manageModal: flag });

  handleCreateModal = flag => this.setState({ createModal: flag });

  selectProduct = product => {
    this.props.selectProduct(product);
    this.handleManageModal(true);
  };

  renderProductList(products) {
    const productsArr = _.map(products);
    return (
      <List divided relaxed selection>
        {productsArr.map(product => {
          const { _id, name, brand, calories, proteins, carbs, fats } = product;
          return (
            <List.Item onClick={() => this.selectProduct(product)} key={_id}>
              <List.Content floated="right">
                <List.Header>(100g)</List.Header>
              </List.Content>
              <List.Content floated="right" verticalAlign="middle">
                <List.Description floated="right">
                  {calories} KCAL | {proteins} P | {carbs} C |{fats} F
                </List.Description>
              </List.Content>

              <List.Icon name="food" size="large" verticalAlign="middle" />

              <List.Content verticalAlign="middle">
                <List.Header as="a">{name}</List.Header>
                <List.Description>{brand}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  }

  render() {
    // handleSubmit provided by reduxForm
    const { selectedProduct, userProducts } = this.props;
    const { manageModal, createModal } = this.state;

    return (
      <Responsive as={Container}>
        <Segment padded>
          <Card raised fluid>
            <Card.Content textAlign="center">
              <Header size="medium">Your Personal Foods</Header>
            </Card.Content>
            <Card.Content>{this.renderProductList(userProducts)}</Card.Content>
            <Card.Content extra>
              <Button onClick={() => this.handleCreateModal(true)} size="small" compact primary>
                Create Food
              </Button>
            </Card.Content>
          </Card>

          <ManageFood
            openModal={manageModal}
            handleModal={this.handleManageModal}
            selectedProduct={selectedProduct}
            {...this.props}
          />

          <CreateFood openModal={createModal} handleModal={this.handleCreateModal} {...this.props} />
        </Segment>
      </Responsive>
    );
  }
}

export default MineFood;
