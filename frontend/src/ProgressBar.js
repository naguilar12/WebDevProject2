import React, {Component} from 'react';

/**
 * This class renders the progress bar to show for every remaining value of the day
 */
export default class ProgressBar extends Component {

    render() {
        //we'll change color taking into account the percentage
        let bar=null;
        if (this.props.pVal<0){
            bar= (<div className="progress-bar  bg-danger"
                           style={{width: "100%"}}>{this.props.total - this.props.actual} {this.props.unit}
            </div>);
        }
        else if(this.props.pVal<50){
            bar= (<div className="progress-bar  bg-warning"
                       style={{width:  this.props.pVal+ "%"}}>{this.props.total - this.props.actual} {this.props.unit}
            </div>);
        }
        else{
            bar= (<div className="progress-bar"
                       style={{width:  this.props.pVal+ "%"}}>{this.props.total - this.props.actual} {this.props.unit}
            </div>);
        }
        return (
            <div className="progress">
                <span className="label-progress">Total {this.props.name} </span>
             {bar}
            </div>
        );
    }
}