import { Button } from "reactstrap";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Test } from "./pages/test";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="test" element={<Test />} />
        </Routes>
      </header>
      <footer>Dev Career Personality Test is based on the project career-personality-test by peachnono on GitHub.</footer>
    </div>
  );
}

export default App;
