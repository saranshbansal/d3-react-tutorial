import React from "react";
import Viz from "./Viz.js";

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function Controller() {
  return <Viz width={width} height={height} />;
}

export default Controller;
