import React, { useEffect } from 'react';
import styled from 'styled-components';
import CurrentTrack from './CurrentTrack';
import Player from './Player';

const Footer = () => {
  return (
    <Container>
      <CurrentTrack />
      <Player />  
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;  
    border: 1px solid red;
`;

export default Footer