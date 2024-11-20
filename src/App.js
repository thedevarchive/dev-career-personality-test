import { Routes, Route, useLocation } from "react-router-dom";

import { Home } from "./pages/home";
import { CareerTest } from "./pages/careerTest";
import { Results } from "./pages/results";
import { DevCareers } from "./pages/devCareers";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const activeStyle = {
  fontWeight: "bold"
};

function App() {
  const location = useLocation();

  // Get the current pathname (e.g., "/home", "/results", etc.)
  const currentPage = location.pathname;

  return (
    <div className="App">
      <header className="App-header">
        {/* Navbar is present on all pages
            Item will be highlighted when user is on the item's corresponding page */}
        <Navbar expand="md">
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/" style={(currentPage === "/") ? activeStyle : null}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={(currentPage === "/takeTest") ? "#" : "/takeTest"} style={(currentPage === "/takeTest") ? activeStyle : null}>
                Career Test
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={(currentPage === "/devCareers") ? "#" : "/devCareers"} style={(currentPage === "/devCareers") ? activeStyle : null}>
                Developer Careers
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        {/* List all pages here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="takeTest" element={<CareerTest />} />
          <Route path="results" element={<Results />} />
          <Route path="devCareers" element={<DevCareers />} />
        </Routes>
      </header>
      {/* Credit to peachnono (Nicole) for the idea */}
      <footer>Dev Career Personality Test is based on the project career-personality-test by peachnono on GitHub.</footer>
    </div>
  );
}

export default App;
