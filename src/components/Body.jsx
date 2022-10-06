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
            let duration = 0;
            for(let i=0;i<response.data.tracks.items.length; i++){
                duration= duration+response.data.tracks.items[i].track.duration_ms;
            }
            console.log(response);
            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                description: response.data.description.startsWith("<a") ? "" : response.data.description,
                image: response.data.images[0].url,
                owner: response.data.owner.display_name,
                duration: duration,
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
            console.log(selectedPlaylist.duration);
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
    },[token, dispatch, selectedPlaylistId]);

  return (
    <Container>
        {
            selectedPlaylist ?
                <SelectedPlaylist className="playlist">
                    <div className="playlist_top">
                        <div className="playlist_image">
                            <img src={selectedPlaylist.image} alt={selectedPlaylist.name} />
                        </div>
                        <div className="playlist_details">
                            <span>PLAYLIST</span>
                            <h1>{selectedPlaylist.name}</h1>
                            <div className="artists">
                                {selectedPlaylist.tracks[0].artists}, {selectedPlaylist.tracks[1].artists} <span>and more</span>
                            </div>
                            <div className="detail">
                                <h3 className='owner'>{selectedPlaylist.owner}</h3>, 
                                <h3 className='tracks_count'>&nbsp;{selectedPlaylist.tracks.length} songs</h3>, 
                                <h3 className='duration'>&nbsp;{selectedPlaylist.duration}</h3>
                            </div>
                        </div>    
                    </div>
                    <div className="playlist_bottom">
                    
                    </div>
                    
                </SelectedPlaylist>
            : <div className="greetings">
            {
                (d.getHours() >=0 && d.getHours() < 12) 
                ? "Good morning" 
                : ((d.getHours() >=12 && d.getHours() < 17) 
                ? "Good afternoon" 
                : "Good evening"
                ) 
            }
            </div>
        }
    </Container>
  )
}

const Container = styled.div`
    overflow: auto;
    // padding-top: 0.2rem;
    // padding-left: 0.7rem;
    // padding-right: 0.7rem;
    font-weight: 600;
    margin: 1rem;

    // border: 2px solid red;

    .greetings{
        font-size: 2rem;
    }
`;

const SelectedPlaylist = styled.div`
    height: 100%;
    width: 100%;

    .playlist_top{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        gap: 1rem;
        
        .playlist_details{
            

            span{
                font-size:0.7rem;
                font-weight: 100;
                padding-left: 2px;
            }

            h1{
                font-size: 7rem;
                padding:0;
                margin:0;
                border: 1px solid red;
            }
        }

        img{
            padding: 1rem;
            height: 200px;
        }
        
        .detail{
            display: flex;
            flex-direction: row;
            align-items: center;
            
        }
    }
`;

export default Body