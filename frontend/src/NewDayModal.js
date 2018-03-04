import React, {Component} from 'react';

/**
 * This class renders the modal to set the new challenge and start a new day of diet.
 */
export default class NewDayModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            protein: props.protein,
            kcals: props.kcals,
            carbohydrates: props.carbohydrates,
            fiber: props.fiber,
            fat: props.fat
        };
        this.handleProteinChange = this.handleProteinChange.bind(this);
        this.handleFiberChange = this.handleFiberChange.bind(this);
        this.handleFatChange = this.handleFatChange.bind(this);
        this.handleCarbohydratesChange = this.handleCarbohydratesChange.bind(this);
        this.handleKcalsChange = this.handleKcalsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleProteinChange(e) {
        let val = Number(e.target.value);
        if (val) {
            this.setState((prevState) => {
                return {
                    protein: val,
                    kcals: prevState.kcals + val * 4 - prevState.protein*4,
                    fiber: prevState.fiber + (val * 4 - prevState.protein*4) / 1000 * 15
                }
            });
        }
        else {
            this.setState({protein: 0});
        }

    }

    handleKcalsChange(e) {
        let val = Number(e.target.value);
        if (val) {
            this.setState((prevState) => {
                return {
                    kcals: val,
                    fiber: val / 1000 * 15
                }
            });
        }
        else {
            this.setState({kcals: 0, fiber: 0});
        }
    }

    handleCarbohydratesChange(e) {
        let val = Number(e.target.value);
        if (val) {
            this.setState((prevState) => {
                return {
                    carbohydrates: val,
                    kcals: prevState.kcals + val * 4- prevState.carbohydrates*4,
                    fiber: prevState.fiber + (val * 4- prevState.carbohydrates*4) / 1000 * 15
                }
            });
        }
        else {
            this.setState({carbohydrates: 0});
        }

    }

    handleFatChange(e) {
        let val = Number(e.target.value);
        if (val) {
            this.setState((prevState) => {
                return {
                    fat: val,
                    kcals: prevState.kcals + val * 9 - prevState.fat*9,
                    fiber: prevState.fiber + (val * 9- prevState.fat*9) / 1000 * 15
                }
            });
        }
        else {
            this.setState({fat: 0});
        }
    }

    handleFiberChange(e) {
        let val = Number(e.target.value);
        if (val) {
            this.setState((prevState) => {
                return {
                    fiber: val
                }
            });
        }
        else {
            this.setState({fiber: 0});
        }
    }

    handleSubmit() {
        console.log(this.state);
        this.props.onSubmit(this.state);
    }

    render() {
        let recomendation = <span>Por ahora se le recomienda entrar lo que come normalmente.</span>;

        return (
            <div className="modal fade" id="newDayModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Input your weight daily</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body row">
                            <div className="row">
                                <span className="col-2">Protein
                                </span>
                                <span className="col-3">Carbohydrates
                                </span>
                                <span className="col-2">Fat
                                </span>
                                <span className="col-2">Fiber
                                </span>
                                <span className="col-3">Energy
                                </span>
                            </div>
                            <div className="row">
                                <input className="col-2" value={this.state.protein}
                                       onChange={this.handleProteinChange}/>

                                <input className="col-3" value={this.state.carbohydrates}
                                       onChange={this.handleCarbohydratesChange}/>

                                <input className="col-2" value={this.state.fat}
                                       onChange={this.handleFatChange}/>
                                <input className="col-2" value={this.state.fiber}
                                       onChange={this.handleFiberChange}/>
                                <input className="col-3" value={this.state.kcals} onChange={this.handleKcalsChange}/>
                            </div>
                            <div className="row">
                                <div className="col-2">g
                                </div>
                                <div className="col-3">g
                                </div>
                                <div className="col-2">g
                                </div>
                                <div className="col-2">g
                                </div>
                                <div className="col-3">Kcals
                                </div>
                            </div>
                            <div className="row">
                                <button type="button" className="submitWeight col-3 btn btn-primary"
                                        onClick={this.handleSubmit}>Start
                                </button>
                            </div>
                            {recomendation}
                        </div>

                        <div className="modal-footer">
                            <div className="col-6"></div>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            <div className="col3"></div>
                        </div>

                    </div>
                </div>
            </div>

        )
            ;
    }
}