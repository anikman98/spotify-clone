import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider';

const Body = () => {

    let d = new Date();

    const [{token, selectedPlaylist}, dispatch] = useStateProvider();

    useEffect(()=>{

        const getInitialPlaylist = async () => {
            const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylist}`,{
                headers: {
                    
                }
            }) 
        };  
        getInitialPlaylist();
        {/*const getUserTopItems = async () => {
            const data = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
                headers: {
                    Authorization: 'Bearer '+token,
                    "Content-Type": "application/json",
                }
            });
            console.log(data);
        }
        getUserTopItems();*/}
    },[token, dispatch]);

  return (
    <Container>
        <div className="greetings">
            {
                (d.getHours() >=0 && d.getHours() < 12) 
                ? "Good morning" 
                : ((d.getHours() >=12 && d.getHours() < 17) 
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