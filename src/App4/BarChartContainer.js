import { ascending } from "d3-array";
import { csv } from "d3-fetch";
import { timeParse } from "d3-time-format";
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";

const parseNA = string => (string === "NA" ? undefined : string);

function format(d) {
  return {
    date: timeParse("%Y-%m-%d")(d.date),
    value: d.value
  };
}

function filterData(data) {
  return data.filter(d => {
    return d.value > 200;
  });
}

function prepareBarChartData(data) {
  // usually more wrangling is required but the example data is simple
  return data;
}

const BarChartContainer = () => {
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
      format
    ).then(data => {
      const dataClean = filterData(data);
      setBarChartData(
        prepareBarChartData(dataClean).sort((a, b) => {
          return ascending(a.value, b.value);
        })
      );
    });
  }, []);

  if (barChartData === null) {
    return <p>Loading...</p>;
  }

  return <BarChart data={barChartData} />;
};

export default BarChartContainer;
