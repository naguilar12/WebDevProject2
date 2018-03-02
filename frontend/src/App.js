import React, { Component } from 'react';
import './App.css';
import NavBar from './NavbarIndex';

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      followers:[]
    };
  }

  componentDidMount() {
    let me = this;
    fetch("http://localhost:3001/api/petrogustavo")
      .then((res) => {
        return res.json();
      })
      .then((followers) => {
        me.setState({followers:followers});
      })
      .catch((err) => console.log(err) );
    
  }


  render() {
    return (
      <div className="App">

        <NavBar/>
      </div>
    );
  }
}

export default App;
