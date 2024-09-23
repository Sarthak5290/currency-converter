import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import CurrencyCOnvertor from "./components/CurrencyConverter.js";

const App = () => {
  return (
    <div className="dark">
      <Router>
        <Navbar></Navbar>
        <CurrencyCOnvertor></CurrencyCOnvertor>
      </Router>
    </div>
  );
};

export default App;
