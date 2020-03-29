import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import React, { useEffect, useRef } from "react";

// margin convention often used with D3
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const color = ["#f05440", "#d5433d", "#b33535", "#283250"];

const BarChart = ({ data }) => {
  const d3svg = useRef(null);

  useEffect(() => {
    if (data && d3svg.current) {
      let svg = select(d3svg.current);

      // adjust margins of the chart within the chart area
      svg = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // scales
      const xMax = max(data, d => d.revenue);

      const xScale = scaleLinear()
        .domain([0, xMax])
        .range([0, width]);

      const yScale = scaleBand()
        .domain(data.map(d => d.genre))
        .rangeRound([0, height])
        .paddingInner(0.25);

      // draw header
      svg
        .append("g")
        .attr("class", "bar-header")
        .attr("transform", `translate(0, ${-margin.top / 2})`)
        .append("text")
        .append("tspan")
        .text("Horizontal bar chart");

      // draw bars
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", d => yScale(d.genre))
        .attr("width", d => xScale(d.revenue))
        .attr("height", yScale.bandwidth())
        .style("fill", function(d, i) {
          return color[i % 4]; // use colors in sequence
        });

      // draw axes
      const xAxis = axisBottom(xScale);
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

      const yAxis = axisLeft(yScale).tickSize(0);
      svg
        .append("g")
        .attr("class", "y axis")
        .call(yAxis);
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

export default BarChart;
