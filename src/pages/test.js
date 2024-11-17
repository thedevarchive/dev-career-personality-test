
import { Button, Card, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';

//Shows the front page of the website
//Contains a hero image and text 
export function Test() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const API_URL = "http://localhost:2000";

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

    //gets each answer by question ID 
    function getAnswers(id) {

        return fetch(`${API_URL}/api/answer/${id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.answers);
                return res.answers;
            })
    }

    useEffect(() => {
        document.title = title;
        getQuestions();
        //code fix by ChatGPT
        //https://chatgpt.com/share/6739752e-5864-8000-97d3-f3acec76a330
        //after getting questions, load all answers of each question 
        questions.forEach((q, index) => {
            let q_id = index + 1;

            getAnswers(q_id).then((data) => {
                //append current iteration's corresponding answers to list of answers
                setAnswers((prev) => ({
                    ...prev,
                    [q_id]: data,
                }));
            });
        });
    }, [title]);

    return (
        <>
            {questions.map((q, index) => {
                let q_id = index + 1;
                // let answers;
                // getAnswers(q_id).then((data) => {
                //     console.log(data[0].answer_text);
                //     answers = data; 
                //     console.log(answers); 
                // })
                // console.log(answers); 

                console.log(answers[q_id][0]); 

                return (
                    <>
                        <p>{q.question_text}</p>
                        <p>{answers[q_id][0].answer_text}</p>
                    </>
                );
            })}
        </>
    );
}