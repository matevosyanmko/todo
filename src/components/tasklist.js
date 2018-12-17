import React, { Component } from "react";
// material components
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Settings from "@material-ui/icons/Settings";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grow from "@material-ui/core/Grow";
import { Checkbox } from "semantic-ui-react";
//custom style
import "./component.css";
// redux components
import { connect } from "react-redux";
//edit modal
import TaskEdit from "./taskedit";

const actions = [
  { icon: <Edit color="primary" />, name: "edit" },
  { icon: <DeleteIcon color="primary" />, name: "delete" }
];

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      editTask: { id: null }
    };
  }
  // show/hide edit modal
  toggleEdit = taskObject => {
    this.setState({
      editOpen: !this.state.editOpen,
      editTask: !this.state.editOpen ? taskObject : null
    });
  };
  render() {
    return (
      <div className="taskList flex directionColumn">
          {this.props.tasks.map((item, key) => (
            <div className="taskItem flex directionRow spaceBTW " key={key}>
              <div className="itemDescription flex directionColumn horizontalCenter ">
                <div className="taskName">{`${item.id}-${item.name}`}</div>
              </div>
              <div className="taskAction flex directionRow  verticalCenter ">
                <Checkbox
                  className="icons"
                  label={{ children: "Done" }}
                  checked={item.done}
                  onChange={() =>
                    this.props.changeTaskState({
                      id: item.id
                    })
                  }
                />
                <SpeedDial
                  className="icons"
                  ariaLabel="SpeedDial example"
                  icon={<Settings fontSize="small" />}
                  onClick={() => this.props.toggleMenu({ id: item.id })}
                  open={item.menuOpen}
                  direction="right"
                >
                  {actions.map((action, key1) => (
                    <SpeedDialAction
                      key={key1}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={
                        action.name === "delete"
                          ? () => this.props.deleteTask({ id: item.id })
                          : () =>
                              this.toggleEdit({
                                name: item.name,
                                id: item.id
                              })
                      }
                    />
                  ))}
                </SpeedDial>
                {this.state.editOpen ? (
                  <TaskEdit
                    name={this.state.editTask.name}
                    time={this.state.editTask.time}
                    id={this.state.editTask.id}
                    close={this.toggleEdit}
                  />
                ) : null}
              </div>
            </div>
          ))}
        
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
    // dispatching plain actions
    changeTaskState: task => {
      dispatch({ type: "CHANGESTATE_TASK", id: task.id });
    },
    toggleMenu: task => {
      dispatch({ type: "TOGGLE_MENU", id: task.id });
    },
    deleteTask: task => {
      dispatch({ type: "DELETE_TASK", id: task.id });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
