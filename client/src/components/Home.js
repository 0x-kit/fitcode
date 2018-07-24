import React, { Component } from "react";
import {
  Button,
  Modal,
  Icon,
  Header,
  Container,
  Tab,
  Segment,
  Grid,
  Image,
  Label
} from "semantic-ui-react";
import requireAuth from "components/requireAuth";

class Home extends Component {
  state = { modalOpen: true };
  modalClose = () => this.setState({ modalOpen: false });

  mainContainer = () => {
    const panes = [
      {
        menuItem: "Tab 1",
        render: () => (
          <Tab.Pane attached={false}>
            <Grid columns="equal">
              <Grid.Row stretched>
                <Grid.Column width={12}>
                  <Segment>
                    <Image src="/images/wireframe/paragraph.png" />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>1</Segment>
                  <Segment>2</Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Segment>1</Segment>
                  <Segment>2</Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Tab 2",
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
      },
      {
        menuItem: "Tab 3",
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
      }
    ];
    return (
      <Container text textAlign="left" style={{ marginTop: "5em" }}>
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
    );
  };
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
    return (
      <div>
        {/* {this.welcomeModal()} */}
        {this.mainContainer()}
      </div>
    );
  }
}

export default requireAuth(Home);
