import React, { Component } from 'react';
import StatsChart from "./StatsChart";

export default class Stats extends Component{
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            data:[
                /*
                {name: 'Page A', isa: 4000, pv: 2400, amt: 2400},
                {name: 'Page B', isa: 3000, pv: 1398, amt: 2210},
                {name: 'Page C', isa: 2000, pv: 9800, amt: 2290},
                {name: 'Page D', isa: 2780, pv: 3908, amt: 2000},
                {name: 'Page E', isa: 1890, pv: 4800, amt: 2181},
                {name: 'Page F', isa: 1000, pv: 3800, amt: 2500},
                {name: 'Page G', isa: 500, pv: 4300, amt: 2100},*/
                ]
        }
        this.dataCallback = this.dataCallback.bind(this);
        this.dataCallback(this.state.userId);
    }

    dataCallback(userid){
        fetch("http://localhost/API/myWeight/"+userid)
            .then((res)=>{
                return res.json();
            })
            .then((user)=>{
                let i = 0;
                user.forEach((w) => {
                    let wei = { name: w.dates[i]*, weight: w.weights[i]};
                    let currState = this.state.data.slice();
                    this.setState({
                        data: currState.concat(wei)
                    })
                    i++;
                });
            })
            .catch((err) => console.log(err) );
    }

    render() {
        return (
            <div className="container-fluid">
                <StatsChart data={this.state.data}/>
            </div>
        );
    }
}