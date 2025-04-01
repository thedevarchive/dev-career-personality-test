
import { Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { HiMiniCodeBracket } from "react-icons/hi2";
import { PiBracketsCurly, PiInfinityBold } from 'react-icons/pi';
import { FiDatabase } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { BiJoystick } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import { FaCubes, FaMobileAlt } from "react-icons/fa";
import { SlLock } from "react-icons/sl";

import { getCareer } from '../api/api';

//mapping of icons to each result in the test
const iconMapping = {
    "Front-End Developer": <HiMiniCodeBracket size={250} />, 
    "Back-End Developer": <PiBracketsCurly size={250} />, 
    "Full Stack Developer": <ImStack size={250} />, 
    "DevOps Engineer": <PiInfinityBold size={250} />, 
    "Database Administrator": <FiDatabase size={250} />, 
    "Game Developer": <BiJoystick size={250} />, 
    "QA Tester": <SiTicktick size={250} />,
    "Mobile App Developer": <FaMobileAlt size={250} />,
    "Cyber Security Expert": <SlLock size={250} />,
    "Blockchain Developer": <FaCubes size={250} />,
}; 

//Show result of personality test
export function Results() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    const [career, setCareer] = useState({});

    const location = useLocation();
    const { result } = location.state || {};

    //Get result from previous page and 
    useEffect(() => {
        getCareer(result).then((careerData) => {
            setCareer(careerData); 
            document.title = career.career_name || "Dev Career Personality Test";
        });
    }, [title]);

    //Show result to user 
    //Result will contain more information on the career than in the devCareers page
    return (
        <>
            <h2 className='results'>Results</h2>
            <h3>{career.career_name}</h3>
            <h4>{iconMapping[career.career_name]}</h4>
            <h4>Personality Description</h4>
            <p>{career.personality_description}</p>
            <h4>Motivation</h4>
            <p>{career.motivation}</p>
            <h4>Work Environment</h4>
            <p>{career.work_environment}</p>
            <h4>Communication Style</h4>
            <p>{career.communication_style}</p>
            <h4>Decision Making</h4>
            <p>{career.decision_making}</p>
            <h4>Conflict Handling</h4>
            <p>{career.conflict_handling}</p>
            <h4>Traits</h4>
            <p>{career.traits}</p>
            <h4>Common Languages and Tech Used</h4>
            <p>{career.tech_stack}</p>
            <Button className='bigButton' href="/takeTest">Retake Test</Button> <br/> 
            <Button className='bigButton' href="/devCareers">See All Careers</Button>
        </>
    );
}