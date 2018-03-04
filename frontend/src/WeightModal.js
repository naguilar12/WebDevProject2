import React, { Component } from 'react';

/**
 * This class renders a modal that allows to enter new weights
 */
export default class WeightModal extends Component{
    constructor(props) {
        super(props);
        this.state={
            weight: props.weight
        };
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    handleChange(e) {
        if(Number(e.target.value) || e.target.value.charAt(-1)===".") {
            this.setState({weight: Number(e.target.value)});
        }
        else{
            this.setState({weight: 0});
        }
    }
    onClick(){
        this.props.onClick(this.state.weight);
    }

    render() {
        let actual=<span></span>;
        if (this.props.weight){
            actual=<span> Today's register weight is {this.props.weight}</span>
        }
        return (
            <div className="modal fade" id="weightModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        
                        <div className="modal-header">
                            <h4 className="modal-title">Input your weight daily</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        
                        <div className="modal-body row">
                            <input id="weight" type="text" className="col-9" onChange={this.handleChange}/>
                            <button type="button" className="submitWeight col-3 btn btn-primary" onClick={this.onClick}>Submit</button>
                            {actual}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" >Close</button>
                        </div>

                    </div>
                </div>
            </div>

    );
    }
}