import React, { Component } from "react";
import Viz from "./Viz.js";

export default class Controller extends Component {
  state = {
    color: "",
    width: "",
    toDraw: []
  };

  onSubmit = evt => {
    evt.preventDefault();
    const newShape = {
      color: this.state.color,
      width: this.state.width
    };
    this.setState({ toDraw: [...this.state.toDraw, newShape] });
  };

  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="colorSelect">Color:</label>
          <select
            id="colorSelect"
            name="color"
            onChange={this.onChange}
            value={this.state.color || "default"}
          >
            <option disabled value="default">
              Select
            </option>
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
            <option value="violet">violet</option>
            <option value="darkblue">darkblue</option>
            <option value="green">green</option>
          </select>

          <label htmlFor="pixelInput">Size:</label>
          <input id="pixelInput" name="width" onChange={this.onChange} />

          <button className="btn success" type="submit">
            DRAW
          </button>
        </form>

        {this.state.toDraw.length ? <Viz shapes={this.state.toDraw} /> : null}
      </div>
    );
  }
}
