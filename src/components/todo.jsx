import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import Lists from "./lists";

class Todo extends Component {
  state = {
    currentState: "all",
    input: "",
    allTasks: [],
    activeTasks: [],
    completedTasks: [],
  };

  componentDidMount() {
    const allTasks = JSON.parse(localStorage.getItem("allTasks"));
    const activeTasks = JSON.parse(localStorage.getItem("activeTasks"));
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    const currentState = JSON.parse(localStorage.getItem("currentState"));

    if (allTasks) {
      this.setState({ allTasks });
    }
    if (activeTasks) {
      this.setState({ activeTasks });
    }
    if (completedTasks) {
      this.setState({ completedTasks });
    }
    if (currentState) {
      this.setState({ currentState });
    }
  }

  addTask = () => {
    const _id = uuid();
    const input = this.state.input.trim().split(/ +/).join(" ");
    if (input) {
      this.setState(
        {
          allTasks: [
            { id: _id, checked: false, task: this.state.input },
            ...this.state.allTasks,
          ],
          input: "",
          activeTasks: [
            { id: _id, checked: false, task: this.state.input },
            ...this.state.activeTasks,
          ],
        },
        () => {
          localStorage.setItem("allTasks", JSON.stringify(this.state.allTasks));
          localStorage.setItem(
            "activeTasks",
            JSON.stringify(this.state.activeTasks)
          );
        }
      );
    }
  };

  handleStateClick = (state) => {
    this.setState({ currentState: state }, () => {
      localStorage.setItem(
        "currentState",
        JSON.stringify(this.state.currentState)
      );
    });
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleCheck = (e, item) => {
    item.checked = e.target.checked;
    const checkedItem = [...this.state.allTasks];
    const index = checkedItem.indexOf(item);
    checkedItem[index] = item;
    const completedTasks = this.state.allTasks.filter((item) => item.checked);
    const activeTasks = this.state.allTasks.filter((item) => !item.checked);
    this.setState({
      allTasks: checkedItem,
      completedTasks,
      activeTasks,
    });
    localStorage.setItem("allTasks", JSON.stringify(checkedItem));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem(
      "activeTasks",
      JSON.stringify(activeTasks)
    );
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.addTask();
    }
  };

  handleDeleteAll = () => {
    const notDeletetableTasks = this.state.allTasks.filter(
      (item) => !item.checked
    );
    this.setState({ allTasks: notDeletetableTasks, completedTasks: [] });
    localStorage.setItem("allTasks", JSON.stringify(notDeletetableTasks))
    localStorage.removeItem('completedTasks')
  };

  handleDelete = (item) => {
    const notDeletetable = this.state.allTasks.filter(
      (task) => task.id !== item.id
    );
    const notCompletedItem = this.state.completedTasks.filter(
      (task) => task.id !== item.id
    );
    this.setState({
      allTasks: notDeletetable,
      completedTasks: notCompletedItem,
    });
    localStorage.setItem("allTasks", JSON.stringify(notDeletetable));
    localStorage.setItem("completedTasks", JSON.stringify(notCompletedItem));
  };

  render() {
    return (
      <>
        <h1>#todo</h1>
        <Lists
          allTasks={this.state.allTasks}
          currentState={this.state.currentState}
          handleCheck={this.handleCheck}
          completedTasks={this.state.completedTasks}
          activeTasks={this.state.activeTasks}
          handleStateClick={this.handleStateClick}
          handleChange={this.handleChange}
          addTask={this.addTask}
          input={this.state.input}
          keyDown={this.handleKeyDown}
          deleteAll={this.handleDeleteAll}
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}

export default Todo;
