import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar';
import Body from './Body';
import Navbar from './Navbar';
import Footer from './Footer';

const Spotify = () => {
  return (
    <Container>
      <div className="spotify_navbar">
        <Navbar/>
      </div>
      <div className="spotify_body">
        <div className="sidebar">
          <Sidebar/>
        </div>
        <div className="body">
            <Body/>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer/>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 6.5vh 83vh 10vh;
  background: black;
  color: white;

  .spotify_body{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: flex-start;
    
    
    .sidebar{
      width: 14vw;
      height: 95%;
      margin: 0 0.5rem;
      padding: 1rem;
      
      background-color: #121212;
      border-radius: 0.5rem;
    }

    .body{
      width: 100%;
      height: 95%;
      margin: 0 0.5rem;
      margin-left: 0.2rem !important;
      padding: 1rem;
      background: linear-gradient( to bottom, #2A1916 , #121212,  #121212);
      background-color:;
      border-radius: 0.5rem;
    }
  }



`;

export default Spotify