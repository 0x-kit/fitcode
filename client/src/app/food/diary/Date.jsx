import React, { Component } from 'react';
import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';
import { Menu, Icon, Card } from 'semantic-ui-react';
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
        let path;
        !this.checkNow(date) ? (path = `/food/diary/${date.format('YYYY-MM-DD')}`) : (path = '/food/diary');

        this.props.history.replace({
          pathname: path
        });

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
    const { loading } = this.props;
    const { myDate, dateTimeOpen } = this.state;
    const add = moment(myDate).add(1, 'day');
    const substract = moment(myDate).subtract(1, 'day');

    /*** */
    const paramBackwardRoute = this.checkBackwardPath() ? '' : substract.format('YYYY-MM-DD');
    const backwardRoute = { pathname: `/food/diary/${paramBackwardRoute}` };

    const paramForwardRoute = this.checkForwardPath() ? '' : add.format('YYYY-MM-DD');
    const forwardRoute = { pathname: `/food/diary/${paramForwardRoute}` };
    /*** */

    return (
      <Card raised fluid style={{ padding: '0' }}>
        {!loading ? (
          <div>
            <Menu widths="3" style={{ height: '1.1em', border: '0', boxShadow: 'none' }}>
              <Menu.Item as={Link} to={backwardRoute} onClick={() => this.changeDay(substract, 'substract')}>
                <Icon size="big" link name="chevron circle left" />
              </Menu.Item>

              <Menu.Item
                style={{ fontSize: '1.23em', fontWeight: 700 }}
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
          </div>
        ) : (
          <div />
        )}
      </Card>
    );
  }
}

export default Date;
