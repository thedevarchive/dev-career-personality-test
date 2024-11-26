
import { Button } from 'reactstrap';
import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import { useCareerTestApis, submitResults } from '../api/api';

//Shows the front page of the website
//Contains a hero image and text 
export function CareerTest() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    const [choices, setChoices] = useState(['']);
    const { loading, loadingError, questions, answers } = useCareerTestApis();
    //handles error messages for test validation 
    const [errorMessage, setErrorMessage] = useState("");

    const API_URL = "http://localhost:2000";

    //load test when user navigates to this page
    useEffect(() => {
        document.title = title;

        const blankChoices = Array(questions.length).fill("");
        setChoices(blankChoices);
    }, [title, questions]);

    //change the user's letter of choice on a given item 
    function onOptionChange(item, userChoice) {
        const newChoices = choices.map((choice, index) => {
            if (index + 1 === item) return userChoice;
            else return choice;
        });

        console.log(newChoices);
        setChoices(newChoices);
    }

    const navigate = useNavigate();

    //submit results to DB 
    //this function was created with the aid of ChatGPT 
    //https://chatgpt.com/share/6739752e-5864-8000-97d3-f3acec76a330
    async function handleSubmit() {
        setErrorMessage("");

        try {
            console.log(choices);
            const result = await submitResults(choices);
            console.log(result);
            navigate("/results", { state: result });
        }
        catch (err) {
            setErrorMessage(err.message); // Set error message on failure
        }
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
                                    <input type="radio" name={q.question_text} value={answer.letter_of_choice} id={`${q_id}-${index}`} onChange={() => onOptionChange(q_id, answer.letter_of_choice)} /> &nbsp;
                                    <label htmlFor={`${q_id}-${index}`}>{answer.letter_of_choice}. {answer.answer_text}</label>
                                </p>
                            ))
                        }
                    </>
                );
            })}
            {/* Error message will be displayed here */}
            <p className='error'>{errorMessage !== "" ? "Make sure to answer all questions." : ""} <br /> {errorMessage}</p>
            <Button className="bigButton" onClick={handleSubmit}>See Results</Button>
        </>
    );
}