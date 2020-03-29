import React, { useEffect, useState } from "react";
import Controller1 from "./App1/Controller";
import Controller2 from "./App2/Controller";
import BarChartContainer from "./App3/BarChartContainer";
import BarChartContainer2 from "./App4/BarChartContainer";
import "./index.css";

const App = () => {
  const [tab, setTab] = useState(() => JSON.parse(localStorage.getItem("tab")));

  useEffect(() => {
    localStorage.setItem("tab", JSON.stringify(tab));
  }, [tab]);

  return (
    <div>
      <header>Welcome to React and D3</header>
      <section>
        <button className="btn info" onClick={() => setTab(1)}>
          APP 1
        </button>
        <button className="btn info" onClick={() => setTab(2)}>
          APP 2
        </button>
        <button className="btn info" onClick={() => setTab(3)}>
          APP 3
        </button>
        <button className="btn info" onClick={() => setTab(4)}>
          APP 4
        </button>
      </section>
      {(() => {
        switch (tab) {
          case 1:
            // code block
            return <Controller1 />;
          case 2:
            // code block
            return <Controller2 />;
          case 3:
            // code block
            return <BarChartContainer />;
          case 4:
            // code block
            return <BarChartContainer2 />;
          default:
            // code block
            return <Controller1 />;
        }
      })()}
    </div>
  );
};

export default App;
