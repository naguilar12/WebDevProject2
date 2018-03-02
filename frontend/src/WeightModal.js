import React, { Component } from 'react';


export default class WeightModal extends Component{
    render() {
        return (
            <div className="modal fade" id="weightModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        
                        <div className="modal-header">
                            <h4 className="modal-title">Input your weight daily</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        
                        <div className="modal-body row">
                            <input id="weight" type="text" className="col-9" />
                            <button type="button" className="submitWeight col-3 btn btn-primary">Submit</button>

                        </div>

                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

    );
    }
}