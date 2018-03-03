import React, { Component } from 'react';
import NavBar from './NavbarIndex';
import MainChallenge from './Challenge';
import About from "./About";
import Login from "./Login";
import Stats from "./Stats";

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      location: 'challenge',
        idUser: 1
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
          main = <MainChallenge idUser={this.state.idUser}/>;
      }
      else{
          main = <Login/>;
      }
    return (
      <div className="App">
          <div>
            <NavBar onChange={this.callbackNavbar}/>
          </div>
          <div className="container-fluid scroll">
          {main}
          </div>
      </div>
    );
  }
}

export default App;
