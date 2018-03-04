import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

/**Component that contains the chart*/
export default class StatsChart extends Component{
    render() {
        return (
            <div className="row justify-content-around center-items chart-content">
                <LineChart width={900} height={600} data={this.props.data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    }
}