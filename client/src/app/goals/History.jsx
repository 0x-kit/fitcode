import React, { Component } from 'react';
import { Segment, Container, Menu, Card } from 'semantic-ui-react';
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

        if (!_.isEmpty(from) && !_.isEmpty(to)) {
            //this.props.complexFetchHistory(from.format('YYYY-MM-DD'), to.format('YYYY-MM-DD'));
            //console.log(this.props.history);
        }
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

const prueba = {
    "5bbcb092a6d30a103c42a282": {
        "date": "2018-09-30T22:00:00.000Z",
        "products": [
            {
                "_id": "5bbcb096a6d30a103c42a28b",
                "product": {
                    "_id": "5b6e055a4ea7837716f46cd8",
                    "name": "Incredible Soft Fish",
                    "brand": "Computer",
                    "calories": 318,
                    "carbs": 137,
                    "proteins": 34,
                    "fats": 158,
                    "__v": 0
                },
                "grams": 100
            },
            {
                "_id": "5bbcb097a6d30a103c42a28e",
                "product": {
                    "_id": "5b6e055a4ea7837716f46ce7",
                    "name": "Refined Cotton Shirt",
                    "brand": "Pizza",
                    "calories": 70,
                    "carbs": 125,
                    "proteins": 48,
                    "fats": 78,
                    "__v": 0,
                    "user": "5b83f23ee6bd64016c330944"
                },
                "grams": 100
            }
        ],
        "recipes": [],
        "_id": "5bbcb092a6d30a103c42a282",
        "user": "5b6e0b2e5949697d105c0a08",
        "part": "Breakfast"
    },
    "5bbcb092a6d30a103c42a283": {
        "date": "2018-09-30T22:00:00.000Z",
        "products": [
            {
                "_id": "5bbcb09ea6d30a103c42a297",
                "product": {
                    "_id": "5b6e061e7775a677d4648f7b",
                    "name": "Incredible Rubber Pizza",
                    "brand": "Hat",
                    "calories": 475,
                    "carbs": 31,
                    "proteins": 119,
                    "fats": 142,
                    "__v": 0
                },
                "grams": 100
            }
        ],
        "recipes": [],
        "_id": "5bbcb092a6d30a103c42a283",
        "user": "5b6e0b2e5949697d105c0a08",
        "part": "Lunch"
    },
    "5bbcb0a2a6d30a103c42a29c": {
        "date": "2018-10-01T22:00:00.000Z",
        "products": [
            {
                "_id": "5bbcb0a7a6d30a103c42a2a5",
                "product": {
                    "_id": "5b6e055a4ea7837716f46cdc",
                    "name": "Rustic Fresh Chips",
                    "brand": "Table",
                    "calories": 391,
                    "carbs": 90,
                    "proteins": 147,
                    "fats": 140,
                    "__v": 0,
                    "user": null
                },
                "grams": 100
            },
            {
                "_id": "5bbcb0b0a6d30a103c42a2a8",
                "product": {
                    "_id": "5b6e055a4ea7837716f46ce1",
                    "name": "Incredible Wooden Ball",
                    "brand": "Gloves",
                    "calories": 86,
                    "carbs": 80,
                    "proteins": 160,
                    "fats": 42,
                    "__v": 0
                },
                "grams": 300
            }
        ],
        "recipes": [],
        "_id": "5bbcb0a2a6d30a103c42a29c",
        "user": "5b6e0b2e5949697d105c0a08",
        "part": "Breakfast"
    },
    "5bbcb0a2a6d30a103c42a29d": {
        "date": "2018-10-01T22:00:00.000Z",
        "products": [],
        "recipes": [
            {
                "serving": 1,
                "_id": "5bbcb0b5a6d30a103c42a2ad",
                "recipe": {
                    "products": [
                        {
                            "_id": "5ba0f2d7dbfae30fa0c45958",
                            "product": {
                                "_id": "5b6e055a4ea7837716f46cdc",
                                "name": "Rustic Fresh Chips",
                                "brand": "Table",
                                "calories": 391,
                                "carbs": 90,
                                "proteins": 147,
                                "fats": 140,
                                "__v": 0,
                                "user": null
                            },
                            "grams": 100
                        },
                        {
                            "_id": "5ba0f2f1dbfae30fa0c4595d",
                            "product": {
                                "_id": "5b6e055a4ea7837716f46cdb",
                                "name": "Chocolate de leche",
                                "brand": "Lindt",
                                "calories": 300,
                                "carbs": 171,
                                "proteins": 93,
                                "fats": 50,
                                "__v": 0,
                                "user": "5b6e0b2e5949697d105c0a07"
                            },
                            "grams": 100
                        }
                    ],
                    "_id": "5ba0f20bdbfae30fa0c4594e",
                    "user": "5b6e0b2e5949697d105c0a08",
                    "name": "Full Proteins",
                    "__v": 0
                }
            }
        ],
        "_id": "5bbcb0a2a6d30a103c42a29d",
        "user": "5b6e0b2e5949697d105c0a08",
        "part": "Lunch"
    },
    "5bbcb0bba6d30a103c42a2b3": {
        "date": "2018-10-02T22:00:00.000Z",
        "products": [],
        "recipes": [
            {
                "serving": 2,
                "_id": "5bbcb0c0a6d30a103c42a2b9",
                "recipe": {
                    "products": [
                        {
                            "_id": "5ba0f2d7dbfae30fa0c45958",
                            "product": {
                                "_id": "5b6e055a4ea7837716f46cdc",
                                "name": "Rustic Fresh Chips",
                                "brand": "Table",
                                "calories": 391,
                                "carbs": 90,
                                "proteins": 147,
                                "fats": 140,
                                "__v": 0,
                                "user": null
                            },
                            "grams": 100
                        },
                        {
                            "_id": "5ba0f2f1dbfae30fa0c4595d",
                            "product": {
                                "_id": "5b6e055a4ea7837716f46cdb",
                                "name": "Chocolate de leche",
                                "brand": "Lindt",
                                "calories": 300,
                                "carbs": 171,
                                "proteins": 93,
                                "fats": 50,
                                "__v": 0,
                                "user": "5b6e0b2e5949697d105c0a07"
                            },
                            "grams": 100
                        }
                    ],
                    "_id": "5ba0f20bdbfae30fa0c4594e",
                    "user": "5b6e0b2e5949697d105c0a08",
                    "name": "Full Proteins",
                    "__v": 0
                }
            }
        ],
        "_id": "5bbcb0bba6d30a103c42a2b3",
        "user": "5b6e0b2e5949697d105c0a08",
        "part": "Lunch"
    },
    "5bbcb0bba6d30a103c42a2b2": {
        "date": "2018-10-02T22:00:00.000Z",
        "products": [
            {
                "_id": "5bbcb0caa6d30a103c42a2c0",
                "product": {
                    "_id": "5b6e055a4ea7837716f46ce7",
                    "name": "Refined Cotton Shirt",
                    "brand": "Pizza",
                    "calories": 70,
                    "carbs": 125,
                    "proteins": 48,
                    "fats": 78,
                    "__v": 0,
                    "user": "5b83f23ee6bd64016c330944"
                },
                "grams": 115
            }
        ],
        "recipes": [],
        "_id": "5bbcb0bba6d30a103c42a2b2",
        "user": "5b6e0b2e5949697d105c0a08",
        "part": "Breakfast"
    },
    "5bbcb0cca6d30a103c42a2c5": {
        "date": "2018-10-03T22:00:00.000Z",
        "products": [
            {
                "_id": "5bbcb0d8a6d30a103c42a2ce",
                "product": {
                    "_id": "5b7eb7705bbae5767c47404a",
                    "name": "dada",
                    "brand": "dada",
                    "calories": 123,
                    "proteins": 123,
                    "carbs": 123,
                    "fats": 123,
                    "user": null,
                    "__v": 0
                },
                "grams": 50
            }
        ],
        "recipes": [
            {
                "serving": 1,
                "_id": "5bbcb0dba6d30a103c42a2cf",
                "recipe": {
                    "products": [
                        {
                            "_id": "5b9fec90b4c0c716ddf7b0d2",
                            "product": {
                                "_id": "5b6e061e7775a677d4648f7b",
                                "name": "Incredible Rubber Pizza",
                                "brand": "Hat",
                                "calories": 475,
                                "carbs": 31,
                                "proteins": 119,
                                "fats": 142,
                                "__v": 0
                            },
                            "grams": 100
                        }
                    ],
                    "_id": "5b9fec85b4c0c716ddf7b0cd",
                    "user": "5b6e0b2e5949697d105c0a08",
                    "name": "Viejo",
                    "__v": 0
                }
            }
        ],
        "_id": "5bbcb0cca6d30a103c42a2c5",
        "user": "5b6e0b2e5949697d105c0a08",
        "part": "Breakfast"
    },
    "5bbcb0dea6d30a103c42a2d4": {
        "date": "2018-10-04T22:00:00.000Z",
        "products": [
            {
                "_id": "5bbcb0e4a6d30a103c42a2dd",
                "product": {
                    "_id": "5b6e055a4ea7837716f46ce7",
                    "name": "Refined Cotton Shirt",
                    "brand": "Pizza",
                    "calories": 70,
                    "carbs": 125,
                    "proteins": 48,
                    "fats": 78,
                    "__v": 0,
                    "user": "5b83f23ee6bd64016c330944"
                },
                "grams": 500
            }
        ],
        "recipes": [],
        "_id": "5bbcb0dea6d30a103c42a2d4",
        "user": "5b6e0b2e5949697d105c0a08",
        "part": "Breakfast"
    }
}

let arr = [];
let index = moment(prueba['5bbcb092a6d30a103c42a282'].date).format('YYYY-MM-DD')
arr[index] = 14;

const result = utils.history(_.map(prueba))
console.log(result)