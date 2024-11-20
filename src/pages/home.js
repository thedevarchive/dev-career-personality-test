
import { Button, Card, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';

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
        </>
    );
}