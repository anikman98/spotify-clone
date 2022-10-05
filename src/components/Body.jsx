import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider';

const Body = () => {

    let d = new Date();

    const [{token, selectedPlaylistId, selectedPlaylist}, dispatch] = useStateProvider();

    useEffect(()=>{

        const getInitialPlaylist = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{
                headers: {
                    Authorization: 'Bearer '+token,
                    "Content-Type": "application/json",
                }
            });
            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                description: response.data.description.startsWith("<a") ? "" : response.data.description,
                image: response.data.images[0].url,
                tracks: response.data.tracks.items.map(({track}) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[2].url,
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_url: track.album.uri,
                    track_number: track.track_number,
                }))
            };
            dispatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist});
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
    },[token, dispatch, selectedPlaylist]);

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