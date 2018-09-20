import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import Highcharts from 'highcharts';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, Tooltip
} from 'react-jsx-highcharts';
import _ from 'lodash';

class History extends Component {

    render() {

        return (
            <Container>
                <Segment padded>
                    <HighchartsChart>
                        <Chart />
                        <Tooltip padding={10} hideDelay={250} shape="square" shared />
                        <Title>Evolution</Title>

                        <Legend layout='vertical' align='left' verticalAlign='top' x={120} y={100} floating />

                        <XAxis categories={['Fecha 1', 'Fecha 2', 'Fecha 3', 'Fecha 4', 'Fecha 5']} />

                        <YAxis min={0} >
                            <YAxis.Title>CALORIES (KCAL)</YAxis.Title>
                            <ColumnSeries name="Calories of the day" data={[3, 9, 12, 15, 18]} />
                        </YAxis>

                        <YAxis opposite={true}>
                            <YAxis.Title>WEIGHT (KG)</YAxis.Title>
                            <SplineSeries name="Weight of the day" data={[60, 61, 61.2, 63, 64]} />
                        </YAxis>
                    </HighchartsChart>
                </Segment>
            </Container>
        );
    }
}


export default withHighcharts(History, Highcharts);
