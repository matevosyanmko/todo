import React, { Component } from "react";
// redux components
import { connect } from "react-redux";
// semantic ui components
import { Button } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
// custom style
import "./component.css";

//initial state
const initialState = {
  taskField: "",
  taskTime: ""
};

class TaskAdd extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  // event on type
  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  // event on submit
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      taskField: initialState.taskField,
      taskTime: initialState.taskTime
    });
    // object for dispatch action
    let task = {
      id: this.props.tasks.length,
      name: this.state.taskField,
      done: false
    };
    this.props.onAddTask(task);
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inputForm flex verticalCenter spaceBTW">
          <div className="fieldInput">
            <Input
              type="text"
              value={this.state.taskField}
              onChange={this.handleChange}
              name="taskField"
              placeholder="Enter Task"
              required
              maxLength={15}
            />
          </div>
          <div className="fieldIcon flex verticalCenter horizontalEnd">
            <Button primary>Add</Button>
          </div>
        </div>
      </form>
    );
  };
}

// redux actions
const mapStateToProps = state => {
  return {
    tasks: state.first,
    todo: state.second
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    onAddTask: task => {
      dispatch({
        type: "ADD_TASK",
        id: task.id,
        name: task.name,
        done: false,
        menuOpen: false
      });
    },
    onVrlo: e => {
      dispatch({ type: "VRLO", name: e.name });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskAdd);
