
import { Button, Card, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

//Shows the front page of the website
//Contains a hero image and text 
export function Results() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");

    const location = useLocation();
    const { result } = location.state || {};

    //Sets title in title bar and will run when page loads
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <h2>Results</h2>
            <p>{result}</p>
        </>
    );
}