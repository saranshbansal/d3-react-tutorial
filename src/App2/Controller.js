import Viz from "./Viz";
import React, { Component } from "react";
export default class Controller extends Component {
  state = {};
  render() {
    return (
      <div className="controller">
        <Viz shapes={this.state} />
      </div>
    );
  }
}
