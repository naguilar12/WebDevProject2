import React, {Component} from 'react';
import './styles/App.css';
import NavBar from './NavbarIndex';
import NavBarUser from './NavbarUser';
import MainChallenge from './Challenge';
import About from "./About";
import Login from "./Login";
import Signin from "./Signup";
import Stats from "./Stats";
import Base64 from "base-64";
import Utf8 from "utf8";


/**
 * This class contains all the components needed to display the whole application.
 */

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navbar: 'index',
            locationUser: 'challenge',
            location: 'about',
            idUser: null,
            userName: null,
            userMail: null,
        };
        this.callbackNavbar = this.callbackNavbar.bind(this);
        this.callbackUserNavbar = this.callbackUserNavbar.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onSubmitSignin = this.onSubmitSignin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    callbackNavbar(value) {
        this.setState({location: value});
    }

    callbackUserNavbar(value) {
        this.setState({locationUser: value});
    }

    onSubmitLogin(email, password) {
        let value = email + ";;;" + password;
        let bytes = Utf8.encode(value);
        let encoded = Base64.encode(bytes);
        console.log("login attempt");
        fetch("/API/login/" + encoded)
            .then(res => {
                return (res.json());
            })
            .then(user => {
                this.setState((prevState) => {
                        return {
                            idUser: user.id,
                            userName: user.name,
                            userMail: user.email,
                            navbar: 'user',
                        };
                    }
                );
            })
            .catch((err) => console.log(err));
    }

    onSubmitSignin(name, email, password) {
        let value = name + ";;;" + email + ";;;" + password;
        let bytes = Utf8.encode(value);
        let encoded = Base64.encode(bytes);
        fetch("/API/signin/" + encoded)
            .then((res) => {
                return (res.json());
            })
            .then((user) => {
                this.setState((prevState) => {
                        return {
                            idUser: user.id,
                            userName: user.name,
                            userMail: user.email,
                            navbar: 'user',
                        };
                    }
                );
            })
            .catch((err) => console.log(err));
    }

    onLogout(){
        this.setState((prevState) => {
                return {
                    idUser: null,
                    userName: null,
                    userMail: null,
                    navbar: 'index',
                };
            }
        );
    }

    render() {
        let main = null;
        let navbar = null;
        if (this.state.navbar === 'index') {
            navbar = <NavBar onChange={this.callbackNavbar}/>;
            if (this.state.location === 'about') {
                main = <About/>;
            }
            else if (this.state.location === 'signin') {
                main = <Signin onSubmit={this.onSubmitSignin}/>;
            }
            else {
                main = <Login onSubmit={this.onSubmitLogin}/>;
            }
        }
        else {
            navbar = <NavBarUser onChange={this.callbackUserNavbar}
                                 userName={this.state.userName} logout={this.onLogout}/>;
            if (this.state.locationUser === 'index') {
                main = <About/>;
            }
            else if (this.state.locationUser === 'stats') {
                main = <Stats userId={this.state.idUser}/>;
            }
            else if (this.state.locationUser === 'challenge') {
                main = <MainChallenge idUser={this.state.idUser}/>;
            }
        }

        //main = <Login/>;
        return (

            <div className="App">
                <div>
                    {navbar}
                </div>
                <div className="container-fluid scroll">
                    {main}
                </div>
            </div>
        );
    }
}

export default App;
