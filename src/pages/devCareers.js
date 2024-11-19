
import { Button, Card, CardImg, CardText, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';
import { Grid2 } from '@mui/material';

//Shows the front page of the website
//Contains a hero image and text 
export function DevCareers() {
    //Contains title for title bar
    const [title, setTitle] = useState("Dev Career Personality Test");
    const [careers, setCareers] = useState([]);

    const API_URL = "http://localhost:2000";

    function getCareers() {
        return fetch(`${API_URL}/api/careers`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => res.careers);
    }

    //Sets title in title bar and will run when page loads
    useEffect(() => {
        document.title = title;
        getCareers().then((data) => {
            setCareers(data);
        });
    }, [title]);

    return (
        <>
            <h2>Careers</h2>
            <Grid2 className="gridContainer" container spacing={2}>
                {
                    careers.map((career) => {
                        return (
                            <Grid2 size={4}>
                                <Card className="careerCard">
                                    <CardTitle>{career.career_name}</CardTitle>
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