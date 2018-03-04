import React, {Component} from 'react';
import './styles/App.css';
import NavBar from './NavbarIndex';
import NavBarUser from './NavbarUser';
import MainChallenge from './Challenge';
import About from "./About";
import Login from "./Login";
import Signin from "./Signin";
import Stats from "./Stats";
import { CookiesProvider } from 'react-cookie';

/**
 * This class contains all the components needed to display the whole application.
 */

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navbar: 'index',
            locationUser: 'index',
            location: 'about',
            idUser: 1,
        };
        this.callbackNavbar = this.callbackNavbar.bind(this);
    }

    callbackNavbar(value) {
        this.setState({location: value});
    }

    callbackUserNavbar(value) {
        this.setState({locationUser: value});
    }

    render() {
        let main = null;
        let navbar = null;
        if (this.state.navbar === 'index') {
            navbar = <NavBar onChange={this.callbackNavbar}/>;
            if(this.state.location === 'about'){
                main = <About/>;
            }
            else if(this.state.location === 'signin'){
                main = <Signin/>;
            }
            else{
                main = <Login/>;
            }
        }
        else {
            navbar = <NavBarUser onChange={this.callbackUserNavbar}/>;
            if(this.state.locationUser === 'index'){
                main = <About/>;
            }
            else if (this.state.locationUser === 'stats') {
                main = <Stats/>;
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
