
import { Button } from 'reactstrap';
import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

//Shows the front page of the website
//Contains a hero image and text 
export function CareerTest() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [choices, setChoices] = useState(['']); 
    const [error, setError] = useState(""); 

    const API_URL = "http://localhost:2000";

    //get all questions from DB
    function getQuestions() {
        return fetch(`${API_URL}/api/question`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => res.questions)
    }

    //gets answers of each question
    function getAnswers(id) {

        return fetch(`${API_URL}/api/answer/${id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => res.answers)
    }

    //load test when user navigates to this page
    useEffect(() => {
        document.title = title;
        //call getQuestions() then getAnswers()
        getQuestions().then((questionData) => {
            setQuestions(questionData);
            //code fix by ChatGPT
            //https://chatgpt.com/share/6739752e-5864-8000-97d3-f3acec76a330
            //after getting questions, load all answers of each question 
            questionData.forEach((q, index) => {
                let q_id = index + 1;

                setChoices((prev) => [...prev, '']); 
    
                getAnswers(q_id).then((data) => {
                    //append current iteration's corresponding answers to list of answers
                    setAnswers((prev) => ({
                        ...prev,
                        [q_id]: data,
                    }));
                });
            });
        });
    }, [title]);

    //change the user's letter of choice on a given item 
    function onOptionChange(item, userChoice) {
        const newChoices = choices.map((choice, index) => {
            if(index + 1 === item) return userChoice; 
            else return choice; 
        }); 

        console.log(newChoices); 
        setChoices(newChoices); 
    }

    const navigate = useNavigate();

    //submit results to DB 
    async function submitResults() {
        //get result from API
        let result = await fetch(`${API_URL}/result/calculate`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({answers: choices})
        })
        .then((res) => res.json());

        //if user does not answer all the questions, error message will be displayed at the bottom of the screen 
        //otherwise navigate to results page 
        if(result.error) setError(result.message); 
        else navigate("/results", {state: result}); 
    }

    return (
        <>
            {/* Instructions for the test */}
            <h2><em>For each question, select the option that fits you best. There are no right or wrong answers, so it is recommended you answer honestly.</em></h2>
            {/* List questions and choices here */}
            {questions.map((q, index) => {
                let q_id = index + 1;
                let answerList = answers[q_id]; 

                return (
                    <>
                        <br /> 
                        <p><strong>{q_id}. {q.question_text}</strong></p>
                        {
                            answerList?.map((answer, index) => (
                                <p>
                                    <input type="radio" name={q.question_text} value={answer.letter_of_choice} id={`${q_id}-${index}`} onChange={() => onOptionChange(q_id, answer.letter_of_choice)}/> &nbsp;
                                    <label htmlFor={`${q_id}-${index}`}>{answer.letter_of_choice}. {answer.answer_text}</label>
                                </p>
                            ))
                        }
                    </>
                );
            })}
            {/* Error message will be displayed here */}
            <p className='error'>{error !== "" ? "Make sure to answer all questions." : ""} <br /> {error}</p>
            <Button className="bigButton" onClick={submitResults}>See Results</Button>
        </>
    );
}