import React from 'react'
import styled from 'styled-components'

const Body = () => {

    let d = new Date();

  return (
    <Container>
        <div className="greetings">
            {
                (d.getHours() >=0 && d.getHours < 12) 
                ? "Good morning" 
                : ((d.getHours() >=12 && d.getHours < 17) 
                ? "Good afternoon" 
                : "Good evening"
                ) 
             }
        </div>
    </Container>
  )
}

const Container = styled.div`
    overflow: auto;
    padding-top: 0.2rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    font-weight: 600;

    .greetings{
        font-size: 2rem;
    }
`;

export default Body