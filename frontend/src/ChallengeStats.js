import React, {Component} from 'react';


export default class ChallengeStats extends Component {
    constructor(props) {
        super(props);

        this.state = {

            pkcals: (props.kcals.total - props.kcals.actual) / props.kcals.total *100,

            pprotein: (props.protein.total - props.protein.actual) / props.protein.total *100,

            pfat: (props.fat.total - props.fat.actual) / props.fat.total *100,

            pfiber: (props.fiber.total - props.fiber.actual) / props.fiber.total *100,

            pcarbohydrates: (props.carbohydrates.total - props.carbohydrates.actual) / props.carbohydrates.total *100,
        };
    }

    render() {
        return (
            <div className="row">
                <div className="container-fluid remainingVals col-9">
                    <div className="progress fiber">
                        <span className="label-progress">Total Energy  </span>
                        <div className="progress-bar"
                             style={{width: this.state.pkcals + "%"}}>{this.props.kcals.total - this.props.kcals.actual} Kcals
                        </div>
                    </div>
                    <div className="progress carbs">
                        <span className="label-progress">Total Carbohydrates  </span>
                        <div className="progress-bar"
                             style={{width: this.state.pcarbohydrates + "%"}}>{this.props.carbohydrates.total - this.props.carbohydrates.actual} g
                        </div>
                    </div>
                    <div className="progress protein">
                        <span className="label-progress">Total Protein  </span>
                        <div className="progress-bar"
                             style={{width: this.state.pprotein + "%"}}>{this.props.protein.total - this.props.protein.actual} g
                        </div>
                    </div>
                    <div className="progress fat">
                        <span className="label-progress">Total Fat </span>
                        <div className="progress-bar" style={{width: this.state.pfat + "%"}}>{this.props.fat.total - this.props.fat.actual} g</div>
                    </div>
                    <div className="progress fiber">
                        <span className="label-progress">Total Fiber </span>
                        <div className="progress-bar" style={{width: this.state.pfiber + "%"}}>{this.props.fiber.total - this.props.fiber.actual} g
                        </div>
                    </div>
                </div>
                <div className="center-items col-3">
                    <div className="buttonsDiv">
                        <button type="button" className="btn btn-primary" data-toggle="modal"
                                data-target="#weightModal">
                            Register your weight
                        </button>
                    </div>
                    <div className="buttonsDiv">
                        <button type="button" className="btn btn-primary" data-toggle="modal"
                                data-target="#newDayModal">
                            Start A New Day
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}