import { useState, useEffect } from "react";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


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
        <h1><strong>Welcome to the Dev Career Personality Test!</strong></h1>
        <h2>Want to be a part of the tech industry but don't know which career path to take?</h2>
        <p>Maybe this can help you.</p>
        <p>Simply press the button below to take a test that will determine the IT career that suits you based on your personality. For best results, answer all questions honestly.</p>
        {questions.map((q, index) => (<p>{q.question_text} {index}</p>))}
      </header>
      <footer>Dev Career Personality Test is based on the project career-personality-test by peachnono on GitHub.</footer>
    </div>
  );
}

export default App;
