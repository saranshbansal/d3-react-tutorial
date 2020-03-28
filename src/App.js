import React, { useEffect, useState } from "react";
import Controller1 from "./App1/Controller.js";
import Controller2 from "./App2/Controller.js";
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
      </section>
      {tab === 1 ? <Controller1 /> : <Controller2 />}
    </div>
  );
};

export default App;
