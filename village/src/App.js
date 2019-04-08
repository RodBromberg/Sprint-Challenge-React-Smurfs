import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import Nav from './components/Nav'

import axios from 'axios'

//vcxcxv

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
  axios.get('http://localhost:3333/smurfs')
    .then(res => this.setState({ smurfs: res.data }))
    .catch(err => console.log(err))
  }

  addSmurf = smurf => {
    //Post Request, updates database and adds a Smurf object into array
    axios
      .post("http://localhost:3333/smurfs", smurf)
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

render() {
  return (
    <div className="App">
      
      <nav className="nav-bar">
      <NavLink  to="/">
        Home
      </NavLink>
      <NavLink  to="/smurf-form">
        Add-Smurf
      </NavLink>
    </nav>
    <Route
        path="/smurf-form"
        render={props => <SmurfForm {...props} updateSmurfs={this.state.smurfs} addSmurf={this.addSmurf} />}
      />

      <Route
        path="/"
        render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
      />
   
    </div>
  );
}
}









export default App;
