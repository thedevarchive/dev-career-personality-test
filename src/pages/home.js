
import { Button, CardGroup, Card } from 'reactstrap';
import { useEffect, useState } from 'react';

import { IconContext } from "react-icons";
import { HiMiniCodeBracket } from "react-icons/hi2";
import { PiBracketsCurly, PiInfinityBold } from 'react-icons/pi';
import { FiDatabase } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { BiJoystick } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";
import { SlLock } from "react-icons/sl";

//Home page
export function Home() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    // State to store randomly selected icons
    const [selectedIcons, setSelectedIcons] = useState([]);

    //icon randomiser code taken from ChatGPT
    //https://chatgpt.com/share/6739752e-5864-8000-97d3-f3acec76a330
    const allIcons = [
        <HiMiniCodeBracket />,
        <PiBracketsCurly />,
        <ImStack />,
        <PiInfinityBold />,
        <FiDatabase />,
        <BiJoystick />,
        <SiTicktick />,
        <FaMobileAlt />,
        <SlLock />
    ];

    // Function to shuffle and select 6 random icons
    const getRandomIcons = () => {
        const shuffled = [...allIcons].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6); // Take the first 6 items
    };

    useEffect(() => {
        //Sets title in title bar and will run when page loads
        document.title = title;
        // Generate 6 random icons on component mount
        setSelectedIcons(getRandomIcons());
    }, [title]);

    return (
        <>
            <h1><strong>Welcome to the Dev Career Personality Test!</strong></h1>
            <h2>Want to be a part of the tech industry but don't know which career path to take?</h2>
            <p>Maybe this can help you.</p>
            <p>Simply press the button below to take a test that will determine the IT career that suits you based on your personality. For best results, answer all questions honestly.</p>
            <p><em>Disclaimer: This test does not intend to stereotype people in the IT industry; this test only serves to <strong>suggest</strong> an IT career for anyone interested in working in that field.</em></p>
            <Button className="bigButton" href="/takeTest">TAKE THE TEST</Button>
            {/* Icons at the bottom half of the page */}
            <CardGroup className="d-flex flex-wrap" style={{ marginTop: "10px" }}>
                <IconContext.Provider value={{ color: "#00004e", size: 100 }}>
                    {selectedIcons.map((icon) => (
                        <Card className="homeCard w-50 p-2">
                            {icon}
                        </Card>
                    ))}
                </IconContext.Provider>
            </CardGroup>
        </>
    );
}