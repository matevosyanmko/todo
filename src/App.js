import React, { Component } from "react";
import "./globalStyles/App.css";
// components
import TaskAdd from "./components/taskadd";
import TaskList from "./components/tasklist";

class App extends Component {
  render() {
    return (
      <>
        <div className="heading flex horizontalCenter">
          <h1>TODO APPLICATION</h1>
        </div>
        <div className="wrapper">
          <TaskAdd />
          <TaskList />
        </div>
      </>
    );
  }
}

export default App;
