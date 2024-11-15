
import { Button, Card, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';

//Shows the front page of the website
//Contains a hero image and text 
export function Test() {
  //Contains title for title bar
  const [title, setTitle] = useState("Home | Alyssa's Portfolio");

  //Sets title in title bar and will run when page loads
  useEffect(() => {
    document.title = title;
}, [title]);

  return (
      <Card className='heroCard'>
        <CardTitle className='heroTitle'>
          HELLO WORLD, I AM
          <h1 className='heroName'>ALYSSA NGO</h1>
          <div className='heroJobTitle'>ASPIRING FULL STACK DEVELOPER</div> <br />
          THIS IS MY PORTFOLIO
          </CardTitle>
        <Button className='heroButton' href="/portfolio">
          SEE MY WORK
        </Button>
      </Card>
  );
}