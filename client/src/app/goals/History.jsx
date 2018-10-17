import React, { Component } from 'react';
import { Segment, Container, Menu, Card, Dimmer, Loader } from 'semantic-ui-react';
import Highcharts from 'highcharts';
import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  ColumnSeries,
  SplineSeries,
  Tooltip
} from 'react-jsx-highcharts';
import utils from 'app/food/HomeUtils';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFromOpen: false,
      dateToOpen: false
    };
  }

  hadleDateFromOpen = () => this.setState({ dateFromOpen: !this.state.dateFromOpen });
  hadleDateToOpen = () => this.setState({ dateToOpen: !this.state.dateToOpen });

  renderHistory = (diaries, weights) => {
    const datesObj = utils.enumerateDaysBetweenDates(this.props.fromDate.clone(), this.props.toDate.clone());
    const caloriesHistory = utils.caloriesHistory(datesObj, diaries);
    const weightsHistory = utils.weightsHistory(datesObj, weights);
    const dateLabels = utils.datesArr(datesObj);

    return (
      <Card raised fluid>
        <HighchartsChart>
          <Chart style={{ fontSize: '22px', fontFamily: 'Lato' }} />
          <Tooltip padding={10} hideDelay={250} shape="square" shared />
          <Title style={{ fontSize: '22px', fontFamily: 'Lato' }}>Evolution</Title>
          <Legend layout="horizontal" align="left" />

          <XAxis categories={dateLabels} />

          <YAxis
            min={0}
            labels={{
              format: '{value} cal'
            }}
          >
            <YAxis.Title style={{ color: '#fb8c00' }}>Calories</YAxis.Title>
            <ColumnSeries name="Calories" data={caloriesHistory} color="#fb8c00" />
          </YAxis>

          <YAxis
            opposite={true}
            labels={{
              format: '{value} kg'
            }}
          >
            <YAxis.Title style={{ color: '#434348' }}>Weight</YAxis.Title>
            <SplineSeries name="Weight" data={weightsHistory} color="#434348" />
          </YAxis>
        </HighchartsChart>
      </Card>
    );
  };
  renderFromDatePicker = () => {
    return (
      <DatetimePicker
        color="black"
        onChange={value => {
          this.props.complexSetFromDate(value);
          this.hadleDateFromOpen();
        }}
        moment={this.props.fromDate}
        time={false}
      />
    );
  };

  renderToDatePicker = () => {
    return (
      <DatetimePicker
        color="black"
        onChange={value => {
          this.props.complexSetToDate(value);
          this.hadleDateToOpen();
        }}
        moment={this.props.toDate}
        time={false}
      />
    );
  };

  render() {
    const { dateFromOpen, dateToOpen } = this.state;
    const { loading, diaries, weights } = this.props;

    return (
      <Container>
        <Segment padded>
          <Card raised fluid style={cardStyle}>
            <Card.Content style={cardContentStyle}>
              <Menu widths="2" style={menuStyle}>
                <Menu.Item
                  style={menuItemStyle}
                  onClick={() => {
                    this.hadleDateFromOpen();
                  }}
                  content={`From:  ${moment(this.props.fromDate).format('LL')}`}
                />
                <Menu.Item
                  style={menuItemStyle}
                  onClick={() => this.hadleDateToOpen()}
                  content={`To:  ${moment(this.props.toDate).format('LL')}`}
                />
              </Menu>
            </Card.Content>
          </Card>

          {dateFromOpen && this.renderFromDatePicker()}

          {dateToOpen && this.renderToDatePicker()}

          {loading ? (
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          ) : (
              this.renderHistory(diaries, weights)
            )}
        </Segment>
      </Container>
    );
  }
}

const menuStyle = { height: '1.1em', border: '0', boxShadow: 'none' };
const menuItemStyle = { fontSize: '1.23em', fontWeight: 700 };
const cardStyle = { padding: '0', marginBottom: '1em' };
const cardContentStyle = { textAlign: 'center' };

export default withHighcharts(History, Highcharts);
