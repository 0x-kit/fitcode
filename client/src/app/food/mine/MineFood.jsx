import React, { Component } from "react";
import ManageFood from "app/food/mine/ManageFood.jsx";
import CreateFood from "app/food/mine/CreateFood.jsx";
import _ from "lodash";
import {
  Card,
  List,
  Header,
  Responsive,
  Container,
  Segment,
  Button,
  Transition
} from "semantic-ui-react";

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
      <Transition.Group
        as={List}
        duration={700}
        animation="fade"
        divided
        relaxed
        selection
      >
        {productsArr.map(product => {
          const { _id, name, brand, calories, proteins, carbs, fats } = product;
          const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;
          return (
            <List.Item onClick={() => this.selectProduct(product)} key={_id}>
              <List.Content content={"100g"} floated="right" />
              <List.Content
                floated="right"
                verticalAlign="middle"
                description={header}
              />

              <List.Icon name="food" size="large" verticalAlign="middle" />

              <List.Content
                header={{ content: name, as: "a" }}
                description={brand}
                verticalAlign="middle"
              />
            </List.Item>
          );
        })}
      </Transition.Group>
    );
  }

  renderMainCard = () => {
    return (
      <Segment basic style={{ marginBottom: '0px' }}>
        <Card.Content style={{ textAlign: 'center' }}>
          <Header size="medium">Your Personal Foods</Header>
          <Button
            secondary
            onClick={() => this.handleCreateModal(true)}
            compact
            primary
            content="Create Food"
          />
        </Card.Content>
      </Segment>
    );
  };

  render() {
    // handleSubmit provided by reduxForm
    const { selectedProduct, userProducts } = this.props;
    const { manageModal, createModal } = this.state;

    return (
      <Responsive as={Container}>
        <Segment padded raised>
          <Card.Group centered>
            {this.renderMainCard()}

            {!_.isEmpty(userProducts) && (
              <Card raised fluid>
                <Card.Content>
                  {this.renderProductList(userProducts)}
                </Card.Content>
              </Card>
            )}
          </Card.Group>

          <ManageFood
            openModal={manageModal}
            handleModal={this.handleManageModal}
            selectedProduct={selectedProduct}
            {...this.props}
          />

          <CreateFood
            openModal={createModal}
            handleModal={this.handleCreateModal}
            {...this.props}
          />
        </Segment>
      </Responsive>
    );
  }
}

export default MineFood;
