import React, { Component } from "react";
// custom style
import "./component.css";
// redux components
import { connect } from "react-redux";
// semantic ui components
import { Button } from "semantic-ui-react";
import { Input } from "semantic-ui-react";

class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.changeTask(this.state);
    this.props.close();
  };
  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="taskEdit flex horizontalCenter verticalCenter">
        <form
          className="flex directionColumn horizontalCenter verticalCenter"
          onSubmit={this.handleSubmit}
        >
          <Input
            placeholder="Task name"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            maxLength={15}
            required
          />
          <Button type="submit">Save</Button>
        </form>
      </div>
    );
  }
}
// redux actions
const mapStateToProps = state => {
  return {
    tasks: state.first
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeTask: task => {
      dispatch({
        type: "EDIT_TASK",
        id: task.id,
        name: task.name
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskEdit);
