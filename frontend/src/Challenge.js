import React, {Component} from 'react';
import ChallengeStats from './ChallengeStats';
import SearchBar from "./SearchBar";
import WeightModal from "./WeightModal";
import CardContainer from "./CardContainer";
import NewDayModal from "./NewDayModal";

/**
 * This class contains all the components needed to display the challenge page
 */

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
        //bind all functions
        this.searchCallback = this.searchCallback.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onPortionChange = this.onPortionChange.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.onSubmitNewDay = this.onSubmitNewDay.bind(this);
        this.onWeightSumbition = this.onWeightSumbition.bind(this);
        this.getCurrChallenge = this.getCurrChallenge.bind(this);
        this.getCurrConsumption = this.getCurrConsumption.bind(this);
        this.getCurrWeight = this.getCurrWeight.bind(this);
        this.handleNewFood = this.handleNewFood.bind(this);

        //call functions to fetch data from previous days
        this.getCurrChallenge();
        this.getCurrConsumption();
        this.getCurrWeight();



    }

    //when a search is launch call the api to get resulting food
    searchCallback() {
        fetch("http://localhost/API/food/" + this.state.searchValue)
            .then((res) => {
                return (res.json());
            })
            .then((food) => {
                this.setState({foods: food});
            })
            .catch((err) => console.log(err));
    }

    //when text is inputed into the search bar
    onTextChange(e) {
        this.setState({
            searchValue: e
        });
    }

    //when a portion is added on the detail food card, to be added to the diet
    onPortionChange(e) {
        this.setState({
            portions: e
        });
    }

    //call api to register new weight submition
    onWeightSumbition(e) {
        fetch('http://localhost/API/myWeight/' + this.props.idUser + '/' + e, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then((res) => {
            return (res.json());
        })
            .then((w) => {

            })
            .catch((err) => console.log(err));
        this.setState({
            weight: e
        });
    }

    //when  a new day submition is made, a new challenge must be created and a new consumption blank, update state
    onSubmitNewDay(state) {
        fetch('http://localhost/API/myChallenge/' + this.props.idUser, {
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
        fetch('http://localhost/API/myConsumption/' + this.props.idUser, {
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
        }).then((res) => {
            return (res.json());
        })
            .then((w) => {

            })
            .catch((err) => console.log(err));

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

    //get last recorded weight from db
    getCurrWeight() {
        fetch("http://localhost/API/myWeight/last/" + this.props.idUser)
            .then((res) => {
                return (res.json());
            })
            .then((w) => {
                this.setState({weight: w});
            })
            .catch((err) => console.log(err));
    }

    //get last recorded challenge from db
    getCurrChallenge() {
        fetch("http://localhost/API/myChallenge/last/" + this.props.idUser)
            .then((res) => {
                return (res.json());
            })
            .then((chall) => {
                this.setState((prevState)=>{
                    return {
                        kcals: {total: chall.kcals, actual:prevState.kcals.actual},
                        protein: {total: chall.protein, actual:prevState.protein.actual},
                        fat: {total: chall.fat, actual:prevState.fat.actual},
                        fiber: {total: chall.fiber, actual:prevState.fiber.actual},
                        carbohydrates: {total: chall.carbohydrates, actual:prevState.carbohydrates.actual}
                    }
                });
            })
            .catch((err) => console.log(err));
    }

    //get last recorded consumption from db
    getCurrConsumption() {
        fetch("http://localhost/API/myConsumption/last/" + this.props.idUser)
            .then((res) => {
                return (res.json());
            })
            .then((cons) => {
                this.setState((prevState)=>{
                    return {
                        kcals: {actual: cons.kcals, total: prevState.kcals.total},
                        protein: {actual: cons.protein, total: prevState.protein.total},
                        fat: {actual: cons.fat, total: prevState.fat.total},
                        fiber: {actual: cons.fiber, total: prevState.fiber.total},
                        carbohydrates: {actual: cons.carbohydrates, total: prevState.carbohydrates.total}
                    }
                });
            })
            .catch((err) => console.log(err));

    }

    //handler for when a food card is selected to see detail
    handleCardClick(id) {
        fetch("http://localhost/API/food/nutrition/" + id)
            .then((res) => {
                return (res.json());
            })
            .then((food) => {
                this.setState({chosenFood: food, foods: []});
            })
            .catch((err) => console.log(err));
    }

    //handle submiting food with certain portion
    handleNewFood() {
        this.setState((prevState) => {
            fetch('http://localhost/API/myConsumption/' + this.props.idUser, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    carbohydrates: prevState.carbohydrates.actual + this.state.chosenFood.carbohydrates * this.state.portions ,
                    fat: prevState.fat.actual + this.state.chosenFood.fat * this.state.portions,
                    fiber: prevState.fiber.actual + this.state.chosenFood.fiber * this.state.portions,
                    protein: prevState.protein.actual + this.state.chosenFood.protein * this.state.portions,
                    kcals: prevState.kcals.actual + this.state.chosenFood.kcals * this.state.portions
                })
            }).then((res) => {
                return (res.json());
            })
                .then((w) => {

                })
                .catch((err) => console.log(err));
                return {
                    kcals: {actual: prevState.kcals.actual + this.state.chosenFood.kcals * this.state.portions, total: prevState.kcals.total},
                    protein: {actual: prevState.protein.actual + this.state.chosenFood.protein * this.state.portions , total: prevState.protein.total},
                    fiber: {actual: prevState.fiber.actual + this.state.chosenFood.fiber * this.state.portions , total: prevState.fiber.total},
                    fat: {actual: prevState.fat.actual + this.state.chosenFood.fat * this.state.portions , total: prevState.fat.total},
                    carbohydrates: {actual: prevState.carbohydrates.actual + this.state.chosenFood.carbohydrates * this.state.portions , total: prevState.carbohydrates.total}
                }
            }
        );
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
                               onPortionChange={this.onPortionChange} handleNewFood={this.handleNewFood} />
                <WeightModal weight={this.state.weight} onClick={this.onWeightSumbition}/>
                <NewDayModal kcals={this.state.kcals.total} protein={this.state.protein.total}
                             carbohydrates={this.state.carbohydrates.total}
                             fat={this.state.fat.total} fiber={this.state.fiber.total}
                             onSubmit={this.onSubmitNewDay}/>
            </div>
        );
    }
}