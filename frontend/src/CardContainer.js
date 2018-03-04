import React, { Component } from 'react';
import Card from "./Card";
import DetailedCard from "./DetailedCard";

/**
 * This class renders the container for all the cards where food will be shown.
 */
export default class CardContainer extends Component{
    render(){
        let foodCard= null;
        let rows= [];
        let handleCardClick=this.props.handleCardClick;
        if (this.props.chosenFood){
            foodCard=(<DetailedCard chosenFood={this.props.chosenFood} portions={this.props.portions} onPortionChange={this.props.onPortionChange} handleNewFood={this.props.handleNewFood}/>);
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