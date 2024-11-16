
import { Button, Card, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';

//Shows the front page of the website
//Contains a hero image and text 
export function Test() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    const [questions, setQuestions] = useState([]);

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

    //Sets title in title bar and will run when page loads
    useEffect(() => {
        document.title = title;
        getQuestions();
    }, [title]);

    return (
        <>
            {questions.map((q, index) => (<p>{q.question_text} {index}</p>))}
        </>
    );
}