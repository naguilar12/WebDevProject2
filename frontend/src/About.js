import React, { Component } from 'react';


export default class About extends Component{
    render() {
        return (
            <div>
            <div className="container-fluid banner">
                <div className="row justify-content-around banner-content">
                    <div className="col center-items">
                        <div className="row justify-content-around">
                            <h1 className="col wow fadeInDown">Hi there!</h1>
                        </div>
                        <div className="row justify-content-around">
                            <h3 className="col wow fadeInUp">Welcome to the dark side of diets, we have pizza!</h3>
                        </div>
                        <br/><br/>
                            <div className="row justify-content-around">
                                <button className="btn start-button wow fadeIn">
                                    GET STARTED
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid about">
                <div className="row about-content justify-content-around">
                    <div className="col-sm-4 center-items wow fadeInLeft">
                        <h1 className="col">About</h1>
                        <img className="col" src={"/resources/about-ying-yang.png"} alt="about-ying-yang"/>
                    </div>
                    <div className="col-sm-8 center-items wow fadeInRight">
                        <div className="row justify-content-around">
                            <h1>We help you eat what you want!</h1>
                            <p>This is an open source project were users can take control of
                                their diary calories consumption.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}