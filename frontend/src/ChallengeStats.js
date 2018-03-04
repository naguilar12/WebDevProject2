import React, {Component} from 'react';
import ProgressBar from "./ProgressBar";

/**
 * This class renders the whole section of challenge stats qhere you can see the remaining values for the day and you have access to the buttons
 */
export default class ChallengeStats extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let pkcals = ((this.props.kcals.total - this.props.kcals.actual) / this.props.kcals.total * 100);
        let pprotein = (this.props.protein.total - this.props.protein.actual) / this.props.protein.total * 100;
        let pfat =  (this.props.fat.total - this.props.fat.actual) / this.props.fat.total * 100;
        let pfiber =  (this.props.fiber.total - this.props.fiber.actual) / this.props.fiber.total * 100;
        let pcarbs =  (this.props.carbohydrates.total - this.props.carbohydrates.actual) / this.props.carbohydrates.total * 100;

        let kunit = "kcals";
        let kname = "Energy";
        let unit = "g";
        let pname = "Protein";
        let fibname = "Fiber";
        let fatName = "Fat";
        let cname = "Carbohydrates";


        return (
            <div className="row">
                <div className="container-fluid remainingVals col-9">

                    <ProgressBar unit={kunit} pVal={pkcals} total={this.props.kcals.total}
                                 actual={this.props.kcals.actual} name={kname}/>
                    <ProgressBar unit={unit} pVal={pcarbs} total={this.props.carbohydrates.total}
                                 actual={this.props.carbohydrates.actual} name={cname}/>
                    <ProgressBar unit={unit} pVal={pprotein} total={this.props.protein.total}
                                 actual={this.props.protein.actual} name={pname}/>
                    <ProgressBar unit={unit} pVal={pfat} total={this.props.fat.total}
                                 actual={this.props.fat.actual} name={fatName}/>
                    <ProgressBar unit={unit} pVal={pfiber} total={this.props.fiber.total}
                                 actual={this.props.fiber.actual} name={fibname}/>


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