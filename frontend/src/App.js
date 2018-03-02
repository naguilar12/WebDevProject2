import React, { Component } from 'react';
import './App.css';
import NavBar from './NavbarIndex';
import MainChallenge from './challenge';

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      location: 'index'
    };
  }


  render() {
    return (
      <div className="App">
          <NavBar/>
          <MainChallenge/>
      </div>
    );
  }
}

export default App;
