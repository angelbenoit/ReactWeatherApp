import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import WeatherPick from "./WeatherPick";

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherPick/>
      </div>
    );
  }
}

export default App;
