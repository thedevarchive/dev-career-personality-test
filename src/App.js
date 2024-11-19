import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Test } from "./pages/test";
import { Results } from "./pages/results";
import { DevCareers } from "./pages/devCareers";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="test" element={<Test />} />
          <Route path="results" element={<Results />} /> 
          <Route path="devCareers" element={<DevCareers />} /> 
        </Routes>
      </header>
      <footer>Dev Career Personality Test is based on the project career-personality-test by peachnono on GitHub.</footer>
    </div>
  );
}

export default App;
