import React, { Component } from 'react';

export default class CardContainer extends Component{
    render(){
        let foodCard= null;
        let rows= [];
        if (this.props.chosenFood){
            foodCard=(<div className='card' key={this.state.chosenFood.ndbno}>
                <div className="card-body">
                    <h5>{this.state.chosenFood.name.toLowerCase()}</h5>
                    <p>Portion: 100g</p>
                    <div className="row">
                        <div className="col-2">Portein: {this.state.chosenFood.protein} g</div>
                        <div className="col-3">Carbohydrates: {this.state.chosenFood.carbohydrates} g</div>
                        <div className="col-2">Fat: {this.state.chosenFood.fat} g</div>
                        <div className="col-2">Fiber: {this.state.chosenFood.fiber} g</div>
                        <div className="col-3">Energy: {this.state.chosenFood.kcals} Kcals</div>
                    </div>
                    <div className="row">
                        <input type="text" value={1} className="col-2"/>
                        <span className="col-1"></span>
                        <button className="btn-primary btn col-4" id='portionsTakenBut'>Submit</button>
                    </div>
                </div>
            </div>);
        }
        this.props.foods.forEach(
            (f) => {
                return (rows.push(<div className='card' key={f.ndbno}>
                    <div className="card-body">
                        <h5>{f.name.toLowerCase()}</h5>
                    </div>
                </div>));
            });

        return (
            <div className="foodItem container-fluid">
                {rows}
                {foodCard}
            </div>
        );
    }
}