import React from 'react'
import styled from 'styled-components'

const Login = () => {

    const handleClick = () => {
        const clientId = "e682f8f720bc4c498c750dc9e92aec12";
        const redirectUrl = "http://localhost:3000/";
        const apiURL = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played"
        ];

        window.location.href = `${apiURL}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialogue=true`;
    }

  return (
    <Container>
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="spotify" />
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
    gap: 3rem;
    height: 100vh;
    width: 100vw;
    
    img{
        width: 600px;
    }

    button{
        width: 350px;
        height: 70px;
        border: none;
        border-radius: 5rem;
        font-size: 1.3rem;
        color: black;
        background-color: #1ED760;
        letter-spacing: 1.5px;
        transition: background-color 0.3s ease;

        &:hover{
            background-color: black;
            border: 3px solid #1ED760;
            color: #1ED760;
        }
    }
`;

export default Login