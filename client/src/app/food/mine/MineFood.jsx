import React, { Component } from 'react';
import ManageFood from 'app/food/mine/ManageFood.jsx';
import CreateFood from 'app/food/mine/CreateFood.jsx';
import _ from 'lodash';
import { Card, List, Header, Responsive, Container, Segment, Button, Transition } from 'semantic-ui-react';

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
      <Transition.Group as={List} duration={700} animation="fade" divided relaxed selection>
        {productsArr.map(product => {
          const { _id, name, brand, calories, proteins, carbs, fats } = product;
          const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
          return (
            <List.Item onClick={() => this.selectProduct(product)} key={_id}>
              <List.Content content={'100g'} floated="right" />
              <List.Content floated="right" verticalAlign="middle" description={header} />

              <List.Icon name="food" size="large" verticalAlign="middle" />

              <List.Content header={{ content: name, as: 'a' }} description={brand} verticalAlign="middle" />
            </List.Item>
          );
        })}
      </Transition.Group>
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
              <Button secondary onClick={() => this.handleCreateModal(true)} size="small" compact primary>
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
