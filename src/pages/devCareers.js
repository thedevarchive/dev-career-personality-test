
import { Card, CardText, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';
import { Grid2, useMediaQuery } from '@mui/material';

import { HiMiniCodeBracket } from "react-icons/hi2";
import { PiBracketsCurly, PiInfinityBold } from 'react-icons/pi';
import { FiDatabase } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { BiJoystick } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";
import { SlLock } from "react-icons/sl";

import { getAllCareers } from '../api/api';

//mapping of icons to each result in the test
const iconMapping = {
    "Front-End Developer": <HiMiniCodeBracket size={70} />,
    "Back-End Developer": <PiBracketsCurly size={70} />,
    "Full Stack Developer": <ImStack size={70} />,
    "DevOps Engineer": <PiInfinityBold size={70} />,
    "Database Administrator": <FiDatabase size={70} />,
    "Game Developer": <BiJoystick size={70} />,
    "QA Tester": <SiTicktick size={70} />,
    "Mobile App Developer": <FaMobileAlt size={70} />,
    "Cyber Security Expert": <SlLock size={70} />,
};

//This page lists all possible results from taking the test
export function DevCareers() {
    //Contains title for title bar
    const [title, setTitle] = useState("Careers in IT");
    const [careers, setCareers] = useState([]);

    // boolean value that checks if website is viewed using a mobile device 
    const isMobile = useMediaQuery("(max-width:600px)");

    //get all possible results 

    useEffect(() => {
        document.title = title;
        getAllCareers().then((data) => {
            setCareers(data);
        });
    }, [title]);

    return (
        <>
            <h2>Careers</h2>
            <p><em>These are all the possible results from taking the test.</em></p>
            <Grid2 className="gridContainer" container spacing={2}>
                {
                    /* Place each career and short description in a card
                        Will add images at some point in the future */
                    careers.map((career) => {
                        return (
                            <Grid2 size={isMobile ? 12 : 4}>
                                <Card className="careerCard">
                                    <CardTitle className='ctStyle'><strong>{career.career_name}</strong></CardTitle>
                                    <CardText>{iconMapping[career.career_name] || " "}</CardText>
                                    <CardText className='cardText'>{career.personality_description}</CardText>
                                </Card>
                            </Grid2>
                        );
                    })
                }
            </Grid2>
        </>
    );
}