import React, { Component } from 'react';
import {
  Button,
  Modal,
  Icon,
  Header,
  Container,
  Responsive
} from 'semantic-ui-react';
import requireAuth from 'components/requireAuth';
import TabBarContainer from 'components/menu/TabBarContainer';
import HomeContainer from 'components/myhome/HomeContainer';
const Food = () => <div>Food content</div>;
const Exercise = () => <div>Exercise content</div>;

class Home extends Component {
  state = { modalOpen: true };
  modalClose = () => this.setState({ modalOpen: false });

  welcomeModal = () => {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.modalClose}
        basic
        size="small"
      >
        <Header textAlign="center">
          <Icon name="code" color="green" />
          Welcome to Fitcode!
        </Header>
        <Modal.Actions>
          <Button color="green" onClick={this.modalClose} inverted>
            <Icon name="checkmark" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };
  render() {
    const tabs = [
      {
        name: 'myHome',
        label: 'My home',
        component: HomeContainer
      },
      { name: 'food', label: 'Food', component: Food },
      { name: 'exercise', label: 'Exercise', component: Exercise }
    ];
    return (
      <div style={{ marginTop: 80 }}>
        <Responsive as={Container}>
          <TabBarContainer tabs={tabs} size="large" />
        </Responsive>
      </div>
    );
  }
}

export default requireAuth(Home);
