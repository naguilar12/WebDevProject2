import React, { Component } from 'react';
import ChallengeStats from './challengeStats';
export default class mainChallenge extends Component{
    render() {
        return (
            <div className="container-fluid">
                <h1>Let's see today's challenge</h1>
                <ChallengeStats/>
            </div>
        );
    }
}