import React, { Component } from 'react';
import {
  Button,
  Modal,
  Icon,
  Header,
  Container,
  Tab,
  Segment
} from 'semantic-ui-react';
import requireAuth from 'components/requireAuth';

class Feature extends Component {
  state = { modalOpen: true };
  modalClose = () => this.setState({ modalOpen: false });

  renderModal = () => {
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
    const panes = [
      {
        menuItem: 'Tab 1',
        render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
      },
      {
        menuItem: 'Tab 2',
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
      },
      {
        menuItem: 'Tab 3',
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
      }
    ];
    return (
      <div>
        {this.renderModal()}
        <Container text textAlign="left" style={{ marginTop: '5em' }}>
          {/* <Header as="h1">Semantic UI React Fixed Template</Header> */}
          <Segment color="black" textAlign="center">
            <Tab
              menu={{
                secondary: true,
                pointing: true
              }}
              panes={panes}
            />
          </Segment>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>
        </Container>
      </div>
    );
  }
}

export default requireAuth(Feature);
