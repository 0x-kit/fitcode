import React, { Component } from 'react';
import { Segment, Container, Menu, Card, Button } from 'semantic-ui-react';
import Highcharts from 'highcharts';
import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, Tooltip
} from 'react-jsx-highcharts';
import _ from 'lodash';
import utils from 'app/food/HomeUtils';


class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dateFromOpen: false,
            dateToOpen: false,
            from: {},
            to: {}

        };
    }

    hadleDateFromOpen = () => this.setState({ dateFromOpen: !this.state.dateFromOpen })

    hadleDateToOpen = () => this.setState({ dateToOpen: !this.state.dateToOpen })

    renderFromDate = () => {
        return (
            <DatetimePicker
                color="black"
                onChange={(value) => { this.setState({ from: value }); this.hadleDateFromOpen() }}
                moment={this.props.date}
                time={false}
            />
        )
    }

    renderToDate = () => {
        return (    
            <DatetimePicker
                color="black"
                onChange={(value) => { this.setState({ to: value }); this.hadleDateToOpen() }}
                moment={this.props.date}
                time={false}
            />
        )
    }

    fetchHistory = () => {
        this.props.complexFetchHistory(this.state.from.format('YYYY-MM-DD'), this.state.to.format('YYYY-MM-DD'));
    }

    renderHistory = (labels, calories, weights) => {

        return (

            <Card raised fluid>
                <HighchartsChart>
                    <Chart style={{ fontSize: "22px", fontFamily: 'Lato' }} />

                    <Tooltip padding={10} hideDelay={250} shape="square" shared />

                    <Title style={{ fontSize: "22px", fontFamily: 'Lato' }}>Evolution</Title>

                    <Legend layout='horizontal' align='left' />

                    <XAxis categories={labels} />


                    <YAxis min={0} labels={{
                        format: '{value} cal'
                    }}
                    >
                        <YAxis.Title style={{ color: "#fb8c00" }}>Calories</YAxis.Title>
                        <ColumnSeries name="Calories" data={calories} color="#fb8c00" />
                    </YAxis>

                    <YAxis opposite={true} labels={{
                        format: '{value} kg',
                    }}>
                        <YAxis.Title style={{ color: "#434348" }}>Weight</YAxis.Title>
                        <SplineSeries name="Weight" data={weights} color="#434348" />
                    </YAxis>

                </HighchartsChart>
            </Card>
        )
    }

    render() {
        const { dateFromOpen, dateToOpen, from, to } = this.state;
        const { diaries, weights } = this.props;
        let caloriesHistory, weightsHistory, dateLabels;

        if (!_.isEmpty(diaries) && !_.isEmpty(weights)) {
            const datesObj = utils.enumerateDaysBetweenDates(this.state.from.clone(), this.state.to.clone());
            caloriesHistory = utils.caloriesHistory(datesObj, diaries);
            weightsHistory = utils.weightsHistory(datesObj, weights)
            dateLabels = utils.datesArr(datesObj);
            console.log("dates",dateLabels)
            console.log("calories",caloriesHistory)
            console.log("weights",weightsHistory)
        }

        return (
            <Container>
                <Segment padded>
                    <Card raised fluid style={{ padding: '0', marginBottom: '1em' }}>
                        <Card.Content style={{ textAlign: 'center' }}>
                            <Menu widths="2" style={{ height: '1.1em', border: '0', boxShadow: 'none' }}>
                                <Menu.Item
                                    style={{ fontSize: '1.23em', fontWeight: 700 }}
                                    onClick={() => { this.hadleDateFromOpen() }}
                                    content={`From:  ${moment(from).format('LL')}`}
                                />
                                <Menu.Item
                                    style={{ fontSize: '1.23em', fontWeight: 700 }}
                                    onClick={() => this.hadleDateToOpen()}
                                    content={`To:  ${moment(to).format('LL')}`}
                                />
                            </Menu>
                            <Button onClick={() => this.fetchHistory()} content="Fetch History" secondary />
                        </Card.Content>
                    </Card>

                    {dateFromOpen && this.renderFromDate()}
                    {dateToOpen && this.renderToDate()}
                    {caloriesHistory && weightsHistory && dateLabels && this.renderHistory(dateLabels, caloriesHistory, weightsHistory)}


                </Segment>
            </Container >
        );
    }
}
// plotLines={[{
//     value: 1300,
//     color: 'red',
//     width: 3,
//     zIndex: 4,
//     label: { text: 'Goal', style: { fontSize: "15px", fontFamily: 'Lato', fontWeight: 'bold', color:'black'} }
// }]}
export default withHighcharts(History, Highcharts);

// var enumerateDaysBetweenDates = function (startDate, endDate) {
//     var now = startDate, dates = [];

//     while (now.isSameOrBefore(endDate)) {
//         dates.push(now.format('M/D/YYYY'));
//         now.add(1, 'days');
//     }
//     return dates;
// };

// var fromDate = moment();
// var toDate = moment().add(6, 'days');
// var results = enumerateDaysBetweenDates(fromDate, toDate);
// console.log(results);

//const result = utils.historyForWeights(_.mapKeys(prueba, "_id"))
//onsole.log(_.mapKeys(prueba, "_id"))

