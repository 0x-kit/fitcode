import React, { Component } from 'react';
import ManageFood from 'app/food/mine/ManageFood.jsx';
import CreateFood from 'app/food/mine/CreateFood.jsx';
import _ from 'lodash';
import { Card, List, Header, Container, Segment, Button, Transition } from 'semantic-ui-react';

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
              <List.Icon name="food" style={{ float: 'left', marginTop: '5px' }} size="large" verticalAlign="middle" />

              <List.Content
                floated="left"
                header={{ content: name, as: 'a' }}
                description={brand}
                style={{ marginBottom: '5px' }}
              />
              <List.Content content={'(100g)'} style={{ float: 'right', marginLeft: '5px' }} />
              <List.Content floated="right" content={header} />
            </List.Item>
          );
        })}
      </Transition.Group>
    );
  }

  renderMainCard = () => {
    const headerStyle = { fontSize: '1.21428571rem' };
    return (
      <Segment basic style={{ marginBottom: '0px' }}>
        <Card.Content style={{ textAlign: 'center' }}>
          <Header style={headerStyle} size="medium">
            Your Personal Food
          </Header>
          <Button secondary onClick={() => this.handleCreateModal(true)} compact primary content="Create Food" />
        </Card.Content>
      </Segment>
    );
  };

  render() {
    // handleSubmit provided by reduxForm
    const { selectedProduct, userProducts, loading } = this.props;
    const { manageModal, createModal } = this.state;
    const containerStyle = { marginBottom: '2rem' };
    return (
      <Container style={containerStyle}>
        {!loading ? (
          <Card.Group centered>
            {this.renderMainCard()}

            {!_.isEmpty(userProducts) && (
              <Card raised fluid>
                <Card.Content>{this.renderProductList(userProducts)}</Card.Content>
              </Card>
            )}
          </Card.Group>
        ) : (
          <div />
        )}
        <ManageFood
          openModal={manageModal}
          handleModal={this.handleManageModal}
          selectedProduct={selectedProduct}
          {...this.props}
        />

        <CreateFood openModal={createModal} handleModal={this.handleCreateModal} {...this.props} />
      </Container>
    );
  }
}

export default MineFood;
