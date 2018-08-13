import React, { Component } from 'react';
import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';
import { Card, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Date extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myDate: props.date,
      dateTimeOpen: false,
      now: moment().format('YYYY-MM-DD')
    };
  }
  componentDidUpdate(prevProps) {
    if (!this.props.date.isSame(prevProps.date)) this.setState({ myDate: this.props.date });
  }

  changeDay = (date, op) => {
    switch (op) {
      case 'add':
        this.props.complexAddDay(date);
        break;
      case 'substract':
        this.props.complexSubstractDay(date);
        break;
      default:
        if (!this.checkNow(date)) {
          this.props.history.push(`?date=${date.format('YYYY-MM-DD')}`);
        } else {
          this.props.history.replace({
            pathname: '/home'
          });
        }
        this.props.complexSetDay(date);
    }
  };

  checkNow(date) {
    return moment(this.state.now).isSame(moment(date).format('YYYY-MM-DD'));
  }

  checkBackwardPath(date = this.state.myDate) {
    return moment(this.state.now).isSame(
      moment(
        moment(date)
          .clone()
          .subtract(1, 'day')
          .format('YYYY-MM-DD')
      )
    );
  }

  checkForwardPath(date = this.state.myDate) {
    return moment(this.state.now).isSame(
      moment(
        moment(date)
          .clone()
          .add(1, 'day')
          .format('YYYY-MM-DD')
      )
    );
  }

  hadleDateOpen = () => {
    this.setState({ dateTimeOpen: !this.state.dateTimeOpen });
  };

  render() {
    const { match } = this.props;
    const { myDate, dateTimeOpen } = this.state;
    const add = moment(myDate).add(1, 'day');
    const substract = moment(myDate).subtract(1, 'day');

    const backwardRoute = {
      pathname: match.path,
      search: this.checkBackwardPath() ? '' : `?date=${substract.format('YYYY-MM-DD')}`
    };

    const forwardRoute = {
      pathname: match.path,
      search: this.checkForwardPath() ? '' : `?date=${add.format('YYYY-MM-DD')}`
    };

    return (
      <Card fluid>
        <Menu widths="3">
          <Menu.Item as={Link} to={backwardRoute} onClick={() => this.changeDay(substract, 'substract')}>
            <Icon size="big" link name="chevron circle left" />
          </Menu.Item>

          <Menu.Item
            className="medium header"
            name={moment(myDate).format('LL')}
            onClick={() => this.hadleDateOpen()}
          />

          <Menu.Item as={Link} to={forwardRoute} onClick={() => this.changeDay(add, 'add')}>
            <Icon size="big" link name="chevron circle right" />
          </Menu.Item>
        </Menu>
        {dateTimeOpen && (
          <DatetimePicker
            onChange={date => {
              this.changeDay(date);
              this.hadleDateOpen();
            }}
            moment={myDate}
            time={false}
            color="black"
          />
        )}
      </Card>
    );
  }
}

export default Date;
