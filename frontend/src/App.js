import React, { Component } from 'react';
import './App.css';
import NavBar from './NavbarIndex';
import MainChallenge from './Challenge';
import About from "./About";
import Login from "./Login";
import Stats from "./Stats";

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      location: 'challenge'
    };
    this.callbackNavbar=this.callbackNavbar.bind(this);
  }

  callbackNavbar(value){
      this.setState({location:value});
  }


  render() {
      let main=null;
      if (this.state.location === 'index'){
          main = <About/>;
      }
      else if(this.state.location === 'stats'){
          main = <Stats/>;
      }
      else if(this.state.location==='challenge'){
          main = <MainChallenge/>;
      }
      else{
          main = <Login/>;
      }
    return (
      <div className="App">
          <NavBar onChange={this.callbackNavbar}/>
          {main}
      </div>
    );
  }
}

export default App;
