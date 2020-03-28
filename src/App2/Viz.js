import * as d3 from "d3";
import React, { useEffect, useState } from "react";

function Viz(props) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

      // When reading the csv, I must format variables:
      d => ({
        date: d3.timeParse("%Y-%m-%d")(d.date),
        value: d.value
      })
    ).then(data => {
      setRows(data);
    });
  }, [rows]);

  const drawLine = () => {
    let xScale = d3
      .scaleTime()
      .domain(d3.extent(rows, ({ date }) => date))
      .rangeRound([0, props.width]);

    let yScale = d3
      .scaleLinear()
      .domain(d3.extent(rows, ({ value }) => value))
      .rangeRound([props.height, 0]);

    let line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    return <path className="line" d={line(rows)} />;
  };

  return (
    <svg className="line-container" width={props.width} height={props.height}>
      {drawLine()}
    </svg>
  );
}

export default Viz;
