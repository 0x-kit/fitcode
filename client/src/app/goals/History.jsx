import React, { Component } from 'react';
import { Segment, Container, Menu, Card } from 'semantic-ui-react';
import Highcharts from 'highcharts';
import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, Tooltip
} from 'react-jsx-highcharts';
import _ from 'lodash';


class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dateFromOpen: false,
            dateToOpen: false,
            from: {},
            to: {},
            now: moment().format('YYYY-MM-DD')
        };
    }

    hadleDateFromOpen = () => this.setState({ dateFromOpen: !this.state.dateFromOpen })

    hadleDateToOpen = () => this.setState({ dateToOpen: !this.state.dateToOpen })

    renderFromDate = () => {
        return (
            <DatetimePicker
                color="black"
                onChange={(value) => { this.setState({ from: value }); this.hadleDateFromOpen() }}
                value={moment(this.state.now)}
                time={false}
            />
        )
    }

    renderToDate = () => {
        return (
            <DatetimePicker
                color="black"
                onChange={(value) => { this.setState({ to: value }); this.hadleDateToOpen() }}
                value={moment(this.state.now)}
                time={false}
            />
        )
    }

    render() {
        const { dateFromOpen, dateToOpen, from, to } = this.state
        return (
            <Container>
                <Segment padded>
                    <Card raised fluid style={{ padding: '0', marginBottom: '1em' }}>
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
                    </Card>

                    {dateFromOpen && this.renderFromDate()}
                    {dateToOpen && this.renderToDate()}

                    {!_.isEmpty(from) && !_.isEmpty(to) ? (
                        <Card raised fluid>
                            <HighchartsChart>
                                <Chart style={{ fontSize: "22px", fontFamily: 'Lato' }} />

                                <Tooltip padding={10} hideDelay={250} shape="square" shared />

                                <Title style={{ fontSize: "22px", fontFamily: 'Lato' }}>Evolution</Title>

                                <Legend layout='horizontal' align='left' />

                                <XAxis categories={['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']} />


                                <YAxis min={0} labels={{
                                    format: '{value} cal'
                                }}
                                >
                                    <YAxis.Title style={{ color: "#fb8c00" }}>Calories</YAxis.Title>
                                    <ColumnSeries name="Calories" data={[1000, 1100, 1050, 1222, 1560]} color="#fb8c00" />
                                </YAxis>

                                <YAxis opposite={true} labels={{
                                    format: '{value} kg',
                                }}>
                                    <YAxis.Title style={{ color: "#434348" }}>Weight</YAxis.Title>
                                    <SplineSeries name="Weight" data={[60, 61, 61.2, 63, 64]} color="#434348" />
                                </YAxis>

                            </HighchartsChart>
                        </Card>
                    ) : <div />}

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