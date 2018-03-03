import React, { Component } from 'react';


export default class ChallengeStats extends Component{
    constructor(props) {
        super(props);

        this.state={
            kcals: props.kcals.actual,
            pkcals:props.kcals.actual/props.kcals.total,
            protein: props.protein.actual,
            pprotein:props.protein.actual/props.protein.total,
            fat: props.fat.actual,
            pfat:props.fat.actual/props.fat.total,
            fiber: props.fiber.actual,
            pfiber:props.fiber.actual/props.fiber.total,
            carbohydrates:props.carbohydrates.actual,
            pcarbohydrates:props.carbohydrates.actual/props.carbohydrates.total,
        };
    }
    render() {
        return (
        <div className="row">
            <div className="container-fluid remainingVals col-9">
                <div className="progress fiber">
                    <span className="label-progress">Total Energy  </span>
                    <div className="progress-bar" style={{width: this.state.pkcals+"%"}}>{this.state.kcals} Kcals</div>
                </div>
                <div className="progress carbs">
                    <span className="label-progress">Total Carbohydrates  </span>
                    <div className="progress-bar" style={{width: this.state.pcarbohydrates+"%"}}>{this.state.carbohydrates} g</div>
                </div>
                <div className="progress protein">
                    <span className="label-progress">Total Protein  </span>
                    <div className="progress-bar" style={{width: this.state.pprotein+"%"}}>{this.state.protein} g</div>
                </div>
                <div className="progress fat">
                    <span className="label-progress">Total Fat </span>
                    <div className="progress-bar" style={{width: this.state.pfat+"%"}}>{this.state.fat} g</div>
                </div>
                <div className="progress fiber">
                    <span className="label-progress">Total Fiber </span>
                    <div className="progress-bar" style={{width: this.state.pfiber+"%"}}>{this.state.fiber} g</div>
                </div>
            </div>
            <div className="center-items col-3">
                <div className="buttonsDiv">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#weightModal">
                Register your weight
                </button>
                </div>
                <div className="buttonsDiv">
                <button type="button" className="btn btn-primary">
                    Start A New Day
                </button>
                </div>
            </div>
        </div>

        );
    }
}