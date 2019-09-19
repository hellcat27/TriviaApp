import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import Select from "react-select";
import "./App.css";
import Game from "./Game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="GameExternal">
            <div className="GameInternal"><Game /></div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
