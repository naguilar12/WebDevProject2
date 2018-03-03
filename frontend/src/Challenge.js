import React, {Component} from 'react';
import ChallengeStats from './ChallengeStats';
import SearchBar from "./SearchBar";
import WeightModal from "./WeightModal";
import CardContainer from "./CardContainer";
import NewDayModal from "./NewDayModal";

export default class mainChallenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foods: [],
            chosenFood: null,
            kcals: {
                total: 17,
                actual: 0
            },
            protein: {
                total: 1,
                actual: 0
            },
            fat: {
                total: 1,
                actual: 0
            },
            fiber: {
                total: 1,
                actual: 0
            },
            carbohydrates: {
                total: 1,
                actual: 0
            },
            weight: 0,
            searchValue: "",
            portions: 1
        };
        this.searchCallback = this.searchCallback.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onPortionChange = this.onPortionChange.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);

        this.onSubmitNewDay = this.onSubmitNewDay.bind(this);
        this.onWeightSumbition = this.onWeightSumbition.bind(this);

    }


    searchCallback() {
        fetch("http://localhost/API/food/" + this.state.searchValue)
            .then((res) => {
                return res.json();
            })
            .then((food) => {
                this.setState({foods: food});
            })
            .catch((err) => console.log(err));
    }

    onTextChange(e) {
        this.setState({
            searchValue: e
        });
    }

    onPortionChange(e) {
        this.setState({
            Portions: e
        });
    }

    onWeightSumbition(e) {
        fetch('http://localhost/myWeight/' + this.props.idUser + '/' + e, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then((res) => {
            console.log(res.json());
            return (res.json());
        });
        this.setState({
            weight: e
        });
    }

    onSubmitNewDay(state) {
        fetch('http://localhost/myChallenge/' + this.props.idUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carbohydrates: state.carbohydrates,
                fat: state.fat,
                fiber: state.fiber,
                protein: state.protein,
                kcals: state.kcals
            })
        });
        fetch('http://localhost/myConsumption/' + this.props.idUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carbohydrates: 0,
                fat: 0,
                fiber: 0,
                protein: 0,
                kcals: 0
            })
        });
        this.setState(
            {
                carbohydrates: {total: state.carbohydrates, actual: 0},
                fat: {total: state.fat, actual: 0},
                fiber: {total: state.fiber, actual: 0},
                protein: {total: state.protein, actual: 0},
                kcals: {total: state.kcals, actual: 0},
            }
        )
    }

    handleCardClick(id) {
        fetch("http://localhost/API/food/nutrition/" + id)
            .then((res) => {
                return res.json();
            })
            .then((food) => {
                this.setState({chosenFood: food, foods: []});
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Let's see today's challenge</h1>
                <ChallengeStats kcals={this.state.kcals} protein={this.state.protein}
                                carbohydrates={this.state.carbohydrates}
                                fat={this.state.fat} fiber={this.state.fiber}/>
                <SearchBar onChange={this.searchCallback} searchValue={this.state.searchValue}
                           onTextChange={this.onTextChange}/>
                <CardContainer foods={this.state.foods} chosenFood={this.state.chosenFood}
                               handleCardClick={this.handleCardClick} portions={this.state.portions}
                               onPortionChange={this.onPortionChange}/>
                <WeightModal weight={this.state.weight} onClick={this.onWeightSumbition}/>
                <NewDayModal kcals={this.state.kcals.total} protein={this.state.protein.total}
                             carbohydrates={this.state.carbohydrates.total}
                             fat={this.state.fat.total} fiber={this.state.fiber.total}
                             onSubmit={this.onSubmitNewDay}/>
            </div>
        );
    }
}