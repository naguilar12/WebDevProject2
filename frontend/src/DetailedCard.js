import React, {Component} from 'react';

export default class DetailedCard extends Component {
    constructor(props){
        super(props);

        this.handleTextChange= this.handleTextChange.bind(this);
    }
    handleTextChange(e) {
        this.props.onPortionChange(e.target.value);

    }


    render() {
        return (
            <div className='card' key={this.props.chosenFood.ndbno}>
                <div className="card-body">
                    <h5>{this.props.chosenFood.name.toLowerCase()}</h5>
                    <p>Portion: 100g</p>
                    <div className="row">
                        <div className="col-2">Portein: {this.props.chosenFood.protein} g</div>
                        <div className="col-3">Carbohydrates: {this.props.chosenFood.carbohydrates} g</div>
                        <div className="col-2">Fat: {this.props.chosenFood.fat} g</div>
                        <div className="col-2">Fiber: {this.props.chosenFood.fiber} g</div>
                        <div className="col-3">Energy: {this.props.chosenFood.kcals} Kcals</div>
                    </div>
                    <div className="row">
                        <span className="col-2"></span>
                        <input type="text" value={this.props.portions} className="col-2" onChange={this.handleTextChange}/>
                        <span className="col-2"></span>
                        <button className="btn-primary btn col-4" id='portionsTakenBut'>Submit</button>
                        <span className="col-2"></span>
                    </div>
                </div>
            </div>
        );
    }
}