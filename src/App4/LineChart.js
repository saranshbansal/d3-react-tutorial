import { extent, min } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleTime } from "d3-scale";
import { select } from "d3-selection";
import { curveMonotoneX, line } from "d3-shape";
import { timeFormat } from "d3-time-format";
import React, { useEffect, useRef } from "react";

// margin convention often used with D3
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const LineChart = ({ data }) => {
  const d3svg = useRef(null);

  useEffect(() => {
    if (data && d3svg.current) {
      let svg = select(d3svg.current);

      // adjust margins of the chart within the chart area
      svg = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // set header
      svg
        .append("g")
        .attr("class", "header")
        .attr("transform", `translate(0, ${-margin.top / 2})`)
        .append("text")
        .append("tspan")
        .text("Line chart");

      // set the ranges
      let x = scaleTime().range([0, width]);
      x.domain(
        extent(data, function(d) {
          return d.date;
        })
      );

      let y = scaleLinear().range([height, 0]);
      y.domain([
        min(data, function(d) {
          return d.value;
        }) - 5,
        100
      ]);

      const valueLine = line()
        .x(function(d) {
          return x(d.date);
        })
        .y(function(d) {
          return y(d.value);
        })
        .curve(curveMonotoneX);

      svg
        .append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueLine);

      const xAxis_woy = axisBottom(x)
        .tickFormat(timeFormat("Week %V"))
        .tickValues(data.map(d => d.date));

      //  Add the X Axis
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis_woy);

      //  Add the Y Axis
      svg.append("g").call(axisLeft(y));

      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d) {
          return x(d.date);
        })
        .attr("cy", function(d) {
          return y(d.value);
        })
        .attr("r", 3);

      svg
        .selectAll(".text")
        .data(data)
        .enter()
        .append("text") // Uses the enter().append() method
        .attr("class", "label") // Assign a class for styling
        .attr("x", function(d, i) {
          return x(d.date);
        })
        .attr("y", function(d) {
          return y(d.value);
        })
        .attr("dx", "-7")
        .attr("dy", "-7")
        .text(function(d) {
          return d.value;
        });
    }
  }, [data]);

  return (
    <svg
      className="chart-container"
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      role="img"
      ref={d3svg}
    ></svg>
  );
};

export default LineChart;
