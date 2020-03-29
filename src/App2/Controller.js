import React from "react";
import Viz from "./Viz.js";

// set the dimensions and margins of the graph
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function Controller() {
  return (
    <div className="chart-container">
      <h4>d3 Line Chart with `svg` created via ReactJs</h4>
      <Viz width={width} height={height} />
    </div>
  );
}

export default Controller;
