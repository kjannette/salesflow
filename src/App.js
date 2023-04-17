import React from "react";
import "./styles/App.css";
import Vehicles from "./components/Vehicles";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Vehicles />
    </div>
  );
};

export default App;
