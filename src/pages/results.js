
import { Button, Card, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const getCareer = async (code) => {
    const API_URL = "http://localhost:2000";

    if(code === undefined) return {};

    const careerMapping = await fetch(`${API_URL}/api/career/${code}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
    
    console.log(careerMapping); 
  
    return careerMapping || {}; // Fallback for unknown codes
  };

//Shows the front page of the website
//Contains a hero image and text 
export function Results() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    const [career, setCareer] = useState({});

    const location = useLocation();
    const { result } = location.state || {};

    //Sets title in title bar and will run when page loads
    useEffect(() => {
        async function getCareerDetails() {
            setCareer(await getCareer(result)); 
            document.title = title;
        }
        getCareerDetails(); 
    }, [title]);

    return (
        <>
            <h2 className='results'>Results</h2>
            <h3>{career.career_name}</h3>
            <h4>Personality Description</h4>
            <p>{career.personality_description}</p>
            <h4>Motivation</h4>
            <p>{career.motivation}</p>
            <h4>Work Environment</h4>
            <p>{career.work_environment}</p>
            <h4>Communication Style</h4>
            <p>{career.communication_style}</p>
            <Button className='bigButton'>Retake Test</Button> <br/> 
            <Button className='bigButton'>See all Results</Button>
        </>
    );
}