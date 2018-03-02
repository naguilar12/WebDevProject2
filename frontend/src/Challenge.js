import React, { Component } from 'react';
import ChallengeStats from './ChallengeStats';
import SearchBar from "./SearchBar";
import WeightModal from "./WeightModal";
export default class mainChallenge extends Component{
    render() {
        return (
            <div className="container-fluid">
                <h1>Let's see today's challenge</h1>
                <ChallengeStats/>
                <SearchBar/>
                <WeightModal/>
            </div>
        );
    }
}