import React, { Component } from 'react';
import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';
import { Card, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Date extends Component {
  state = { dateTimeOpen: false };

  componentDidMount() {
    this.setState({
      myDate: this.props.date,
      dateTimeOpen: false
    });
  }

  componentWillUpdate;

  componentWillReceiveProps(props) {
    this.setState({
      myDate: props.date,
      dateTimeOpen: false
    });
  }

  addDay = date => {
    // this.props.complexAddDay(date, () => {
    //   this.props.complexFetchHome(date.format('YYYY-MM-DD'));
    // });
    this.props.complexAddDay(date);
  };

  substractDay = date => {
    // this.props.complexSubstractDay(date, () => {
    //   this.props.complexFetchHome(date.format('YYYY-MM-DD'));
    // });
    this.props.complexSubstractDay(date);
  };

  render() {
    const { match } = this.props;
    const { myDate } = this.state;

    const addDay = moment(myDate).add(1, 'day');
    const backDay = moment(myDate).subtract(1, 'day');

    const backwardRoute = {
      pathname: match.path,
      search: `?date=${backDay.format('YYYY-MM-DD')}`
    };
    const forwardRoute = {
      pathname: match.path,
      search: `?date=${addDay.format('YYYY-MM-DD')}`
    };

    return (
      <Card fluid raised>
        <Menu widths="3">
          <Menu.Item as={Link} to={backwardRoute} onClick={() => this.substractDay(backDay)}>
            <Icon size="big" link name="chevron circle left" />
          </Menu.Item>

          <Menu.Item
            className="medium header"
            name={moment(this.state.myDate).format('LL')}
            onClick={() => this.setState({ dateTimeOpen: true })}
          />

          <Menu.Item as={Link} to={forwardRoute} onClick={() => this.addDay(addDay)}>
            <Icon size="big" link name="chevron circle right" />
          </Menu.Item>
        </Menu>
        {this.state.dateTimeOpen && (
          <DatetimePicker
            onChange={value => {
              this.setState({ dateTimeOpen: false });
              //console.log(value);
            }}
            moment={this.state.myDate}
            time={false}
            color="black"
          />
        )}
      </Card>
    );
  }
}

export default Date;
