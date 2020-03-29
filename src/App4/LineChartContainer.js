import { ascending } from "d3-array";
import { csv } from "d3-fetch";
import { timeParse } from "d3-time-format";
import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";

const parseNA = string => (string === "NA" ? undefined : string);

function format(d) {
  return {
    date: timeParse("%Y-%m-%d")(d.date),
    value: d.value
  };
}

function filterData(data) {
  return data.filter(d => {
    return parseNA(d.value) && d.value > 200;
  });
}

function prepareLineChartData(data) {
  // usually more wrangling is required but the example data is simple
  return data;
}

function dummyData() {
  let lineData = [];

  lineData.push({ date: new Date(2019, 1, 4), value: 89 });
  lineData.push({ date: new Date(2019, 1, 11), value: 96 });
  lineData.push({ date: new Date(2019, 1, 18), value: 87 });
  lineData.push({ date: new Date(2019, 1, 25), value: 99 });
  lineData.push({ date: new Date(2019, 2, 4), value: 83 });
  lineData.push({ date: new Date(2019, 2, 11), value: 93 });
  lineData.push({ date: new Date(2019, 2, 18), value: 79 });
  lineData.push({ date: new Date(2019, 2, 25), value: 94 });
  lineData.push({ date: new Date(2019, 3, 4), value: 89 });
  lineData.push({ date: new Date(2019, 3, 11), value: 93 });
  lineData.push({ date: new Date(2019, 3, 18), value: 81 });

  lineData.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return lineData;
}

const LineChartContainer = () => {
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
      format
    ).then(data => {
      const dataClean = filterData(data);
      setLineChartData(
        prepareLineChartData(dataClean).sort((a, b) => {
          return ascending(a.value, b.value);
        })
      );
    });
  }, []);

  if (lineChartData === null) {
    return <p>Loading...</p>;
  }

  return <LineChart data={dummyData()} />;
};

export default LineChartContainer;
