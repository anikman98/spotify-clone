import React, { useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar';
import Body from './Body';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';


const Spotify = () => {

  const [{token, playlists}, dispatch] = useStateProvider();

  useEffect(()=>{
    const getUserInfo = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me",{
        headers: {
          Authorization: 'Bearer '+token,
          "Content-Type": "application/json",
        }
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        userImage: data.images[0].url,
      };
      dispatch({type: reducerCases.SET_USER, userInfo});
    };
    getUserInfo();
  },[token, dispatch]);

  let d = new Date();
  let hrs = d.getHours();

  return (
    <Container>
      <div className="spotify_navbar">
        <Navbar/>
      </div>
      <div className="spotify_body">
        <div className="sidebar">
          <Sidebar/>
        </div>
        <div className={(hrs >= 4 && hrs < 12) ? "body morning" : ((hrs >= 12 && hrs < 17) ? "body afternoon" : "body evening") }>
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
      height: 99%;
      margin: 0 0.5rem;
      margin-left: 0.2rem !important;
      border-radius: 0.5rem;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 0;


      &::-webkit-scrollbar {
          width: 0.5rem;
          &-track{
              background-color: rgba(255, 255, 255, 0.3);
              border-radius: 0 10px 10px 0 ;
            }
            &-thumb{
              margin-top: 0.5rem;
              background-color: rgba(255, 255, 255, 0.4);
              border-radius: 10px;
          }
      }
    }
    .morning{
      background: linear-gradient( to bottom , rgba(163, 110, 5, 0.75),  #121212 25%);
    }
    .afternoon{
      background: linear-gradient( to bottom, #2A1916 ,  #121212 25%);
    }
    .evening{
      background: linear-gradient( to bottom, rgba(5, 95, 163, 0.7),  #121212 30%);

    }
  }



`;

export default Spotify