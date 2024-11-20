
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';
import { Grid2 } from '@mui/material';

//This page lists all possible results from taking the test
export function DevCareers() {
    //Contains title for title bar
    const [title, setTitle] = useState("Careers in IT");
    const [careers, setCareers] = useState([]);

    const API_URL = "http://localhost:2000";

    //get all possible results 
    function getAllCareers() {
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

    useEffect(() => {
        document.title = title;
        getAllCareers().then((data) => {
            setCareers(data);
        });
    }, [title]);

    return (
        <>
            <h2>Careers</h2>
            <Grid2 className="gridContainer" container spacing={2}>
                {
                    /* Place each career and short description in a card
                        Will add images at some point in the future */
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