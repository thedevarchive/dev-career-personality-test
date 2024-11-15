
import { Button, Card, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';

//Shows the front page of the website
//Contains a hero image and text 
export function Home() {
    //Contains title for title bar
    const [title, setTitle] = useState("Home | Alyssa's Portfolio");

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
            <Button className="heroButton" href="/test">TAKE THE TEST</Button>
        </>
    );
}