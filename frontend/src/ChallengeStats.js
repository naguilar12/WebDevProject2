import React, { Component } from 'react';


export default class ChallengeStats extends Component{
    render() {
        return (
        <div className="row">
            <div className="container-fluid remainingVals col-9">
                <div className="progress kcals">
                    <span className="label-progress">Total Energy  </span>
                    <div className="progress-bar" style={{width: "80%"}}>3000 Kcals</div>
                </div>
                <div className="progress carbs">
                    <span className="label-progress">Total Carbohydrates  </span>
                    <div className="progress-bar" style={{width: "80%"}}>150 g</div>
                </div>
                <div className="progress protein">
                    <span className="label-progress">Total Protein  </span>
                    <div className="progress-bar" style={{width: "80%"}}>120 g</div>
                </div>
                <div className="progress fat">
                    <span className="label-progress">Total Fat </span>
                    <div className="progress-bar" style={{width: "80%"}}>30 g</div>
                </div>
                <div className="progress fiber">
                    <span className="label-progress">Total Fiber </span>
                    <div className="progress-bar" style={{width: "80%"}}>100 g</div>
                </div>
            </div>
            <div className="center-items col-3">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#weightModal">
                Register your weight
                </button>
            </div>
        </div>

        );
    }
}