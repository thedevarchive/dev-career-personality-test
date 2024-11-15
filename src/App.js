import { Button } from "reactstrap";
import { useState, useEffect } from "react";

import { Home } from "./pages/home";
import { Test } from "./pages/test";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Routes,
  Route
} from "react-router-dom";

const API_URL = "http://localhost:2000";

function App() {
  const [questions, setQuestions] = useState([]);

  function getQuestions() {
    fetch(`${API_URL}/api/question`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res.questions);
      })
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="test" element={<Test />} />
        </Routes>
        {questions.map((q, index) => (<p>{q.question_text} {index}</p>))}
      </header>
      <footer>Dev Career Personality Test is based on the project career-personality-test by peachnono on GitHub.</footer>
    </div>
  );
}

export default App;
