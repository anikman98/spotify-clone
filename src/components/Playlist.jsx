import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider';


const Playlist = () => {

    const [{token, playlists}, dispatch] = useStateProvider();
    useEffect(()=>{
        const getPlaylistData = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: 'Bearer '+token,
                    "Content-Type": "application/json",
                }
            });
            const {items} = response.data;
            const playlists = items.map(({name, id}) => {return {name, id}});
            dispatch({type: reducerCases.SET_PLAYLISTS, playlists});
        }
        getPlaylistData();
    },[token, dispatch]);

  return (
    <Container>
        <ul>
        {
            playlists.map(({name, id})=> {
                return (
                    <li key={id}>{
                        name.length > 27
                        ? name.slice(0,25)+'...'
                        : name
                    }
                    </li>
                );
            })
        }
        </ul>
    </Container>
  )
}

const Container = styled.div`
    height: 100%;
    overflow: hidden;
    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 1rem;
        font-weight: 400;
        font-size: 0.9rem;
        color: #C0C0C0;
        height: 62vh;
        min-height: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 0.6rem;
            &-thumb{
                background-color: rgba(255, 255, 255, 0.5);
            }
        }

        li{
            &:hover{
                cursor: pointer;
                color: white;
            }
        }
    }
`;

export default Playlist