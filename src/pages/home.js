
import { Button, CardGroup, Card } from 'reactstrap';
import { useEffect, useState } from 'react';

import { IconContext } from "react-icons";
import { HiMiniCodeBracket } from "react-icons/hi2";
import { PiBracketsCurly, PiInfinityBold } from 'react-icons/pi';
import { FiDatabase } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { BiJoystick } from "react-icons/bi";

//Home page
export function Home() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");

    //Sets title in title bar and will run when page loads
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <h1><strong>Welcome to the Dev Career Personality Test!</strong></h1>
            <h2>Want to be a part of the tech industry but don't know which career path to take?</h2>
            <p>Maybe this can help you.</p>
            <p>Simply press the button below to take a test that will determine the IT career that suits you based on your personality. For best results, answer all questions honestly.</p>
            <p><em>Disclaimer: This test does not intend to stereotype people in the IT industry; this test only serves to <strong>suggest</strong> an IT career for anyone interested in working in that field.</em></p>
            <Button className="bigButton" href="/takeTest">TAKE THE TEST</Button>
            <CardGroup style={{marginTop: "10px"}}>
                <IconContext.Provider value={{ color: "#00004e", size: 100 }}>
                    <Card className="homeCard"> <HiMiniCodeBracket /></Card>
                    <Card className="homeCard"> <PiBracketsCurly /></Card>
                    <Card className="homeCard"> <ImStack /></Card>
                    <Card className="homeCard"> <PiInfinityBold /></Card>
                    <Card className="homeCard"> <FiDatabase /></Card>
                    <Card className="homeCard"> <BiJoystick /></Card>
                </IconContext.Provider>
            </CardGroup>
        </>
    );
}