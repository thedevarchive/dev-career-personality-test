import { useState, useEffect } from "react";

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

export function useCareerTestApis() {
    //create state containers 
    //loading for when the page loads
    //error for error handling
    //repos and photos from the APIs
    //search for searching repositories
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        try {
            //call getQuestions() then getAnswers()
            getQuestions().then((questionData) => {
                setQuestions(questionData);
                //code fix by ChatGPT
                //https://chatgpt.com/share/6739752e-5864-8000-97d3-f3acec76a330
                //after getting questions, load all answers of each question 
                questionData.forEach((q, index) => {
                    let q_id = index + 1;

                    getAnswers(q_id).then((data) => {
                        //append current iteration's corresponding answers to list of answers
                        setAnswers((prev) => ({
                            ...prev,
                            [q_id]: data,
                        }));
                    });
                });
            });

            setTimeout(() => {
                setLoading(false);
            }, 500);
        } catch (err) {
            setError(err);

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, []);

    return { loading, error, questions, answers };
} 