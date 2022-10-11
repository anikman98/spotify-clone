import React, {useEffect} from 'react'
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';


const CurrentTrack = () => {

    const [{token, currentlyPlaying}, dispatch] = useStateProvider();

    useEffect(()=>{
        
        const getCurrentTrack = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`,{
                headers: {
                    Authorization: 'Bearer '+token,
                    "Content-Type": "application/json",
                }
            });
            console.log(response);
            if(response.data !== ""){
                if(response.data.currently_playing_type !== "ad" ){
                    const {item} = response.data;
                    const currentlyPlaying = {
                        id: item.id,
                        name: item.name,
                        artists: item.artists.map((artist) => artist.name),
                        image: item.album.images[2].url
                    };
                    dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
                }else{
                    console.log("currently ad is running!");
                }
            }else{
                console.log("currently not track playing!");
            }
        };  
        getCurrentTrack();
    },[token, dispatch]);
    
    return (
        <Container>
            {
                currentlyPlaying !== null ? (
                    <div className="track">
                        <div className="track_image">
                            <img src={currentlyPlaying.image} alt={currentlyPlaying.name} />
                        </div>
                        <div className="track_details">
                            <div className="track_name">
                                {currentlyPlaying.name}
                            </div>
                            <div className="track_artists">
                                {currentlyPlaying.artists.join(', ')}
                            </div>
                        </div>
                    </div>
                ) : "Loading..."
            }
        </Container>
    )
}

const Container = styled.div`
    
    .track{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        
        .track_image{
            img{
                padding-top: 4px;
                width: 54px;
            }
        }
        .track_details{
            padding: 0 0.5rem;
            .track_name{
                font-size: 0.8rem;
                padding-bottom: 5px;
            }
            .track_artists{
                color: #9b9b9b;
                font-size: 0.65rem;;
            }
        }
    }
`;

export default CurrentTrack