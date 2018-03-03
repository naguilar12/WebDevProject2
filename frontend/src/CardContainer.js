import React, { Component } from 'react';
import Card from "./Card";
import DetailedCard from "./DetailedCard";

export default class CardContainer extends Component{
    render(){
        let foodCard= null;
        let rows= [];
        let handleCardClick=this.props.handleCardClick;
        if (this.props.chosenFood){
            foodCard=(<DetailedCard chosenFood={this.props.chosenFood} portions={this.props.portions} onPortionChange={this.props.onPortionChange}/>);
        }

        this.props.foods.forEach(
            (f) => {
                return (rows.push(<Card  handleCardClick={handleCardClick} id={f.ndbno} key={f.ndbno} name={f.name}/>));
            });

        return (
            <div className="foodItem container-fluid">
                {rows}
                {foodCard}
            </div>
        );
    }
}