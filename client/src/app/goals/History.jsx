import React, { Component } from 'react';
import { Container, Menu, Card, Dimmer, Loader } from 'semantic-ui-react';
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
import transform from 'app/common/Transformations';

const menuStyle = { height: '1.1em', border: '0', boxShadow: 'none' };
const menuItemStyle = { fontSize: '1.23em', fontWeight: 700 };
const cardStyle = { padding: '0', marginBottom: '1em' };
const cardContentStyle = { textAlign: 'center', padding: '0' };
const chartStyle = { fontSize: '22px', fontFamily: 'Lato' };
const chartTitleStyle = { fontSize: '22px', fontFamily: 'Lato' };
const YAxisTitleStyle = { color: '#fb8c00' };
const XAxisTitleStyle = { color: '#434348' };

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFromOpen: false,
      dateToOpen: false
    };
  }

  hadleDateFromOpen = () => this.setState({ dateFromOpen: !this.state.dateFromOpen, dateToOpen: false });
  hadleDateToOpen = () => this.setState({ dateToOpen: !this.state.dateToOpen, dateFromOpen: false });

  renderHistory = (diaries, weights) => {
    const { fromDate, toDate } = this.props;
    const datesObj = transform.enumerateDaysBetweenDates(fromDate.clone(), toDate.clone(), 'YYYY-MM-DD');
    const caloriesHistory = transform.caloriesHistory(datesObj, diaries);
    const weightsHistory = transform.weightsHistory(datesObj, weights);

    const datesObjForLabels = transform.enumerateDaysBetweenDates(fromDate.clone(), toDate.clone(), 'Do');
    const dateLabels = transform.datesArr(datesObjForLabels);
    
    return (
      <Card raised fluid>
        <HighchartsChart>
          <Chart style={chartStyle} />
          <Tooltip padding={10} hideDelay={250} shape="square" shared="true" />
          <Title style={chartTitleStyle}>Evolution</Title>
          <Legend layout="horizontal" align="center" />

          <XAxis categories={dateLabels} />

          <YAxis
            min={0}
            labels={{
              format: '{value} cal'
            }}
          >
            <YAxis.Title style={YAxisTitleStyle}>Calories</YAxis.Title>
            <ColumnSeries name="Calories" data={caloriesHistory} color="#fb8c00" />
          </YAxis>

          <YAxis
            opposite={true}
            labels={{
              format: '{value} kg'
            }}
          >
            <YAxis.Title style={XAxisTitleStyle}>Weight</YAxis.Title>
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
    const containerStyle = { marginBottom: '2rem' };
    return (
      <Container style={containerStyle}>
        {loading ? (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : (
          <div>
            <Card raised fluid style={cardStyle}>
              <Card.Content style={cardContentStyle}>
                <Menu widths="2" borderless style={menuStyle}>
                  <Menu.Item
                    style={menuItemStyle}
                    onClick={() => {
                      this.hadleDateFromOpen();
                    }}
                    content={`From:  ${moment(this.props.fromDate).format('MMM Do')}`}
                  />
                  <Menu.Item
                    style={menuItemStyle}
                    onClick={() => this.hadleDateToOpen()}
                    content={`To:  ${moment(this.props.toDate).format('MMM Do')}`}
                  />
                </Menu>
              </Card.Content>
            </Card>
            {dateFromOpen && this.renderFromDatePicker()}
            {dateToOpen && this.renderToDatePicker()}
            {this.renderHistory(diaries, weights)}
          </div>
        )}
      </Container>
    );
  }
}

export default withHighcharts(History, Highcharts);
