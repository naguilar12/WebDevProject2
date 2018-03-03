import React, { Component } from 'react';
import ChallengeStats from './ChallengeStats';
import SearchBar from "./SearchBar";
import WeightModal from "./WeightModal";
import CardContainer from "./CardContainer";
export default class mainChallenge extends Component{
    constructor(props) {
        super(props);

        this.state={
            foods: [],
            chosenFood: null,
            kcals: {
                total:0,
                actual:0
            },
            protein: {
                total:0,
                actual:0
            },
            fat: {
                total:0,
                actual:0
            },
            fiber: {
                total:0,
                actual:0
            },
            carbohydrates:{
                total:0,
                actual:0
            },
            weight:0,
            searchValue: ""
        };
        this.searchCallback=this.searchCallback.bind(this);
        this.onTextChange=this.onTextChange.bind(this);
    }
    searchCallback(){
        fetch("http://localhost/API/food/"+this.state.searchValue)
            .then((res) => {
                return res.json();
            })
            .then((food) => {
                this.setState({foods:food});
            })
            .catch((err) => console.log(err) );
    }
    onTextChange(e){
        this.setState({
            searchValue: e
        });
    }
    render() {
        return (
            <div className="container-fluid">
                <h1>Let's see today's challenge</h1>
                <ChallengeStats kcals={this.state.kcals} protein={this.state.protein} carbohydrates={this.state.carbohydrates}
                fat={this.state.fat} fiber={this.state.fiber}/>
                <SearchBar onChange={this.searchCallback} searchValue={this.state.searchValue} onTextChange={this.onTextChange}/>
                <CardContainer foods={this.state.foods} chosenFood={this.state.chosenFood}/>
                <WeightModal weight={this.state.weight}/>
            </div>
        );
    }
}