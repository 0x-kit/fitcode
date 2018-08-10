import React, { Component } from 'react';
import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';
import { Container, Form, Card, Segment, Menu, Icon } from 'semantic-ui-react';

moment.locale('en');

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDate: moment(),
      dateTimeOpen: false
    };
  }
  render() {
    return (
      <Card fluid raised>
        <Menu widths="3">
          <Menu.Item onClick={this.handleItemClick}>
            <Icon size="big" link name="chevron circle left" />
          </Menu.Item>

          <Menu.Item
            name={moment(this.state.myDate).format('LL')}
            onClick={() => this.setState({ dateTimeOpen: true })}
          />

          <Menu.Item onClick={this.handleItemClick}>
            <Icon size="big" link name="chevron circle right" />
          </Menu.Item>
        </Menu>
        {this.state.dateTimeOpen && (
          <DatetimePicker
            onChange={value => {
              this.setState({ myDate: value, dateTimeOpen: false });
            }}
            moment={this.myDate}
            time={false}
            color="black"
          />
        )}
      </Card>
    );
  }
}

export default Date;
