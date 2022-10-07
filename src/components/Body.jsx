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
                <SelectedPlaylist>
                    <div className="playlist_top">
                        <div className="playlist_image">
                            <img src={selectedPlaylist.image} alt={selectedPlaylist.name} />
                        </div>
                        <div className="playlist_details">
                            <span className='playlist_text'>PLAYLIST</span>
                            <h1>{selectedPlaylist.name}</h1>
                            <div className="artists">
                                {selectedPlaylist.tracks[0].artists[0]}<span>,</span> {selectedPlaylist.tracks[1].artists[0]}<span>,</span> {selectedPlaylist.tracks[2].artists[0]} <span>and more</span>
                            </div>
                            <div className="detail">
                                <h3 className='owner'>{selectedPlaylist.owner}</h3>&nbsp;&nbsp;<p>•</p>&nbsp; 
                                <h3 className='tracks_count'>&nbsp;{selectedPlaylist.tracks.length} songs</h3><span>,</span> 
                                <h3 className='duration'>&nbsp;{parseInt(selectedPlaylist.duration/(1000*60*60))} hr</h3>
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
    font-weight: 600;
    // margin: 1rem;
    overflow: hidden;
    
    // border: 2px solid red;
    
    .greetings{
        font-size: 2rem;
    }
    `;
    
const SelectedPlaylist = styled.div`
    height: 100%;
    width: 100%;
    overflow-x: hidden !important;
    border-radius: 10px 10px 0px 0px;
    display:flex;
    
    // border: 1px solid red;
    
    .playlist_top{
        background-color: rgb(160, 224, 216);
        background: linear-gradient(to bottom, rgba(160, 224, 216,1), rgba(160, 224, 216,0.5));
        width:100%;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        gap: 1rem;
        
        .playlist_details{

            span{
                font-size:0.9rem;
                font-weight: 100;
                padding-left: 2px;
            }
            
            h1{
                display: block;
                font-size: 7rem;
                padding:0;
                padding-bottom: 20px;
                margin:0;
                line-height: 120px;
                font-weight: bold;
            }

            .artists{
                font-weight: 400 !important;
                font-size: 0.9rem;
                span{
                    color: #e6e6e6;
                }
            }
            
            .detail{
                display: flex;
                flex-direction: row;
                align-items: center;
                padding-bottom: 10px;
                margin: 0;
                
                h3{
                    line-height: 0.5rem;
                    font-size: 1rem;
                }
                
                p{
                    font-size: 0.6rem;
                }
                
                span{
                    color: #e6e6e6;
                }

                .tracks_count{
                    font-weight: lighter;
                }
                
                .duration{
                    color: #e6e6e6;
                    font-size: 0.99rem;
                    font-weight: 400;
                }
                
            }
        }
        img{
            padding: 1rem;
            height: 232px;
        }

    }
`;

export default Body