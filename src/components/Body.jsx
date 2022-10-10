import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider';
import '../index.css';

const Body = () => {

    let d = new Date();

    const fav = false;

    const [{token, selectedPlaylistId, selectedPlaylist}, dispatch] = useStateProvider();

    const getTimeFormattedForPlaylistDetails = (duration) => {
        const hours = Math.floor(duration / (1000 *60 *60));
        const minutes = Math.floor((duration % (1000*60*60)) / 60000);
        return hours + ' hr ' + minutes + ' min';
    }

    const getTimeFormattedForTrackList = (duration) => {
        const minutes = Math.floor(duration / 60000)
        const seconds = ((duration % 60000)/1000).toFixed(0);
        return minutes + ':' + (seconds<10 ? '0'+seconds : seconds);
    }

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
                                <h3 className='duration'>&nbsp;{getTimeFormattedForPlaylistDetails(selectedPlaylist.duration)}</h3>
                            </div>
                        </div>    
                    </div>
                    <div className="playlist_bottom">
                        <div className="playlist_buttons">
                            <button type="button" className="play_button" aria-aria-label='Play/Pause'>
                                <svg role="img" height="28" width="28" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                            </button>
                            <button type="button" className="favourite" aria-aria-label='Favourite'>
                                {
                                    fav 
                                    ? <svg className='false' role="img" height="32" width="32" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"></path></svg>
                                    : <svg className='true' role="img" height="32" width="32" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path></svg>
                                }
                            </button>
                            <button type="button" className="menu" aria-aria-label='Menu'>
                                <svg role="img" height="32" width="32" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>                            
                            </button>
                            </div>
                            <div className="tracks">
                                <div className="track_header">
                                    <div className="header_items sl_no">
                                         <span>#</span>
                                    </div>
                                    <div className="header_items title">
                                        <span>TITLE</span>
                                    </div>
                                    <div className="header_items album">
                                        <span>ALBUM</span>
                                    </div>
                                    <div className="header_items time">
                                        <span>
                                            <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path><path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path></svg>    
                                        </span>
                                    </div>
                                </div>
                                <div className="dash"></div>
                                <div className="track_list">
                                    {
                                        selectedPlaylist.tracks.map((track, index)=>{
                                            return(
                                                <div className='track' key={index}>
                                                    <div className="track_item sl_no">
                                                        {index+1}
                                                    </div>
                                                    <div className="track_item play">
                                                        <svg role="img" height="28" width="28" viewBox="0 0 24 24" class="Svg-ytk21e-0 jAKAlG"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                                                    </div>
                                                    <div className='track_item title'>
                                                        <div className="image">
                                                        <img src={track.image} alt={track.name} />
                                                        </div>
                                                        <div className="details">
                                                            <div className="name">
                                                                {track.name}
                                                            </div>
                                                            <div className="artist">
                                                                {track.artists.map((artist, index) => { if(index > 0)return ', '+artist; else return artist})}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='track_item album'>{track.album}</div>
                                                    <div className='track_item time'>{getTimeFormattedForTrackList(track.duration)}</div>
                                                </div>
                                            )
                                        })
                                    }                            
                                </div>
                            </div>
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
    font-weight: 400;
    
    
    
    &::-webkit-scrollbar {
        width: 0.5rem;
        &-track{
            background-color: rgba(255,255,255,1);
        }
        &-thumb{
            background-color: rgba(255, 255, 255, 0.5);
        }
    }
    
    .greetings{
        font-size: 2rem;
    }
`;
    
const SelectedPlaylist = styled.div`
    width: 100%;
    overflow: auto;
    border-radius: 10px 0px 0px 0px;
    display:flex;
    flex-direction: column;
    justify-content: start;
    overflow-x: hidden;

    .false{
        /* fill: #c7c7c7;  */
        fill: #1ed760;
    }
    .true{
    }
    
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

            margin-left: -0.5rem;

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
    
    .playlist_bottom{
        
        background: linear-gradient(to bottom, rgba(160, 224, 216,0.4), transparent 90%) no-repeat;
        background-size: 100% 260px;
        width:100%;
        height: 100%;

        .playlist_buttons{
            margin: 1rem;
            display: flex;
            flex-direction: rows;
            justify-content: flex-start;
            align-items: center;
            
            button{
                background: none;
                border: none;
                margin: 1rem;

                &:hover{
                    border: none;
                }
            }
            
            .play_button{
                width: 60px;
                height: 60px;
                background-color: rgb(30,215,96);
                border-radius: 50%;
                display:flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                transition: scale 0.2s ease;

                &:hover{
                    scale: 1.05;
                    border: none;
                }
            }
            
            .favourite{
                fill: #1ed760;

            }
            
            .menu{
                fill: #c7c7c7;
                &:hover{
                    fill: white;
                }
            }
            
        }
        
        .tracks{
            display:flex;
            flex-direction: column;
            justify-content: start;
            padding: 0 2rem 1.5rem 2rem;
            
            .track_header{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-content: center;
                font-size: 0.8rem;
                letter-spacing: 3px;
                color: #b1b1b1;
                fill: #b1b1b1;
                font-weight: lighter;
                
                .header_items{
                    /* border: 1px solid red; */
                }
                
                .sl_no{
                    width: 3%;
                    text-align: center;
                }
                
                .title{
                    width: 48%;
                    padding-left: 1rem;
                }
                
                .album{
                    width: 40%;
                    padding-left: 1rem;
                }
                
                .time{
                    width: 4%;
                    text-align: end;
                    padding-right: 1rem;
                }
                
            }
            
            .track_list{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                width: 100%;
                padding-top: 0.5rem;
                font-size: 0.9rem;
                letter-spacing: 1px;
                color: #b1b1b1;
                fill: #b1b1b1;
                font-weight: lighter;
                
                
                .track{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 0.5rem 0;
                    letter-spacing: 0px;

                    &:hover{
                        color: white !important;
                        background-color: rgba(255,255,255, 0.1);
                        border-radius: 5px;

                        .sl_no{
                            display: none;
                        }

                        .play{
                            width: 3%;
                            text-align: center;
                            font-size: 1rem;
                            display: block;
                            
                            svg{
                                fill: white;
                                width: 18px;
                                padding-left: 5px;
                            }
                            /* border: 1px solid red;                         */
                        }
                    }
                    
                    .track_item{
                    }
                    
                    .sl_no{
                        width: 3%;
                        text-align: center;
                        font-size: 1rem;
                    }

                    .play{
                        display: none;
                    }
                    
                    .title{
                        width: 48%;
                        padding-left: 1rem;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: center;

                        img{
                            width: 40px;
                            padding: 0 15px 0 0;
                        }

                        .details{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .name{
                                font-size: 1rem;
                                color: white;
                                padding-bottom: 10px;
                            }
                            .artist{
                                font-size: 0.8rem;
                            }
                        }
                    }
                    
                    .album{
                        width: 40%;
                        padding-left: 1rem;
                    }
                    
                    .time{
                        width: 4%;
                        text-align: end;
                        /* padding-right: 2rem; */
                    }
                }
            }
            
            .dash{
                background-color: #3b3b3b;
                height: 1px;
                border: none;
                margin-top: 0.3rem;
                margin-bottom: 0.7rem;
            }
            svg{
                fill:#a6a6a6;
            }
        }
    }
`;

export default Body