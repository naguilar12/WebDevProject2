import React,  { Component }  from "react";
import ReactDOM from "react-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/NavbarIndex.css"
import registerServiceWorker from "./registerServiceWorker";

export default class NavbarIndex extends React.Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return(
            <nav classNameName="navbar navbar-inverse navbar-toggleable-md fixed-top">
                <button classNameName="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <a className="navbar-brand" href="index.html"><img className="img-responsive" id="navbar_logo"
                                                               src={"/resources/diet_advisor_logo.png"}
                                                               alt="diet_advisor_logo" /></a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li id="home-option" className="nav-item center-items">
                            <a id="home-link" className="nav-link">
                                <i className="fa fa-home"></i><br/>
                                Home
                            </a>
                        </li>
                        <li id="my-stats-option" className="nav-item center-items">
                            <a id="my-stats-link" className="nav-link" href="stats.html">
                                <i className="fa fa-line-chart"></i><br/>
                                My Stats
                            </a>
                        </li>
                        <li id="challenge-option" className="nav-item center-items">
                            <a id="challenge-link" className="nav-link" href="challenge.html">
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