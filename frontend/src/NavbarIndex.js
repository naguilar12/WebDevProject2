import React,  { Component }  from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/NavbarIndex.css"
import registerServiceWorker from "./registerServiceWorker";

export default class NavbarIndex extends Component{
    constructor(props) {
        super(props);

        this.state = {
            onChange: props.onChange
        };
    }

    render(){
        return(
            <nav className="navbar navbar-inverse navbar-toggleable-md fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <a className="navbar-brand" onClick={this.state.onChange.bind(this,"index")}><img className="img-responsive" id="navbar_logo"
                                                               src={"/resources/diet_advisor_logo.png"}
                                                               alt="diet_advisor_logo" /></a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li id="home-option" className="nav-item center-items">
                            <a id="home-link" className="nav-link" onClick={this.state.onChange.bind(this,"index")}>
                                <i className="fa fa-home"></i><br/>
                                Home
                            </a>
                        </li>
                        <li id="my-stats-option" className="nav-item center-items">
                            <a id="my-stats-link" className="nav-link" onClick={this.state.onChange.bind(this,"stats")}>
                                <i className="fa fa-line-chart"></i><br/>
                                My Stats
                            </a>
                        </li>
                        <li id="challenge-option" className="nav-item center-items">
                            <a id="challenge-link" className="nav-link" onClick={this.state.onChange.bind(this,"challenge")}>
                                <i className="fa fa-cutlery"></i><br/>
                                Challenge
                            </a>
                        </li>
                        <li id="user-option" className="nav-item  center-items">
                            <a className="nav-link dropdown-toggle user-item" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user-circle"></i><br/>
                                Name
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">
                                    <i className="fa fa-power-off"></i>  Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


registerServiceWorker();
