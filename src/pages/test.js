
import { Button } from 'reactstrap';
import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

//Shows the front page of the website
//Contains a hero image and text 
export function Test() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [choices, setChoices] = useState(['']); 

    const API_URL = "http://localhost:2000";

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

    //gets answers of each question ID 
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

    function onOptionChange(item, userChoice) {
        const newChoices = choices.map((choice, index) => {
            if(index + 1 === item) return userChoice; 
            else return choice; 
        }); 

        console.log(newChoices); 
        setChoices(newChoices); 
    }

    const navigate = useNavigate();

    async function submitResults() {

        console.log("aaaa"); 
        let result = await fetch(`${API_URL}/result/calculate`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({answers: choices})
        })
        .then((res) => res.json()); 

        console.log(result);

        navigate("/results", {state: result}); 
    }

    return (
        <>
            {questions.map((q, index) => {
                let q_id = index + 1;
                let answerList = answers[q_id]; 

                return (
                    <>
                        <br /> 
                        <p>{q_id}. {q.question_text}</p>
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
            <Button id="resultsButton" onClick={submitResults}>See Results</Button>
        </>
    );
}