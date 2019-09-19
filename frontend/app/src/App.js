import React  from "react";
import "./App.css";
import Game from "./Game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
