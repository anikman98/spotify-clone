import React from 'react'
import styled from 'styled-components'
import {MdHomeFilled} from 'react-icons/md'
import {IoLibrary} from 'react-icons/io5'
import { useStateProvider } from '../utils/StateProvider'

const Navbar = () => {

    const [{userInfo}] = useStateProvider();

  return (
    <Container>
        <div className="navbar_left logo">
            <svg viewBox="0 0 167.5 167.5" className="spotify-logo"><title>Spotify</title><path fill="currentColor" d="M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7S130 0 83.7 0zM122 120.8c-1.4 2.5-4.6 3.2-7 1.7-19.8-12-44.5-14.7-73.7-8-2.8.5-5.6-1.2-6.2-4-.2-2.8 1.5-5.6 4-6.2 32-7.3 59.6-4.2 81.6 9.3 2.6 1.5 3.4 4.7 1.8 7.2zM132.5 98c-2 3-6 4-9 2.2-22.5-14-56.8-18-83.4-9.8-3.2 1-7-1-8-4.3s1-7 4.6-8c30.4-9 68.2-4.5 94 11 3 2 4 6 2 9zm1-23.8c-27-16-71.6-17.5-97.4-9.7-4 1.3-8.2-1-9.5-5.2-1.3-4 1-8.5 5.2-9.8 29.6-9 78.8-7.2 109.8 11.2 3.7 2.2 5 7 2.7 10.7-2 3.8-7 5-10.6 2.8z"></path></svg>
        </div>
        <div className="navbar_middle">
            <div className="home">
                <svg role="img" height="24" width="24" className="Svg-ytk21e-0 jAKAlG home-active-icon" viewBox="0 0 24 24"><path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"></path></svg>
            </div>
            <div className="search">
                <svg role="img" height="24" width="24" className="Svg-ytk21e-0 jAKAlG mOLTJ2mxkzHJj6Y9_na_" aria-hidden="true" viewBox="0 0 24 24"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
                <input type="text" placeholder='What do you want to listen to?'/>
            </div>
        </div>
        <div className="navbar_right">
            {
                userInfo 
                ? <img src={userInfo.userImage} alt={userInfo.userName} />
                : ""
            }
        </div>
    </Container>
    )
}

const Container = styled.div`

    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // border: 1px solid red;
    height: 6vh;

    .logo{
        padding-top: 5px;
        padding-left: 10px;
        width: 32px;
    }

    .navbar_middle{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        .home{
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            border: 2px solid transparent;
            background-color: rgba(255,255,255,0.2);
            fill: white;

            &:hover{
                border: 2px solid white;
            }
        }
        .search{
            width: 450px;
            height: 45px;
            border-radius: 2rem;
            border:2px solid transparent;
            background-color: rgba(255,255,255,0.15);
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            gap: 1rem;
            fill: white;

            &:hover{
                border: 2px solid white;
            }

            svg{
                padding-left: 1rem;
            }

            input{
                background: transparent;
                border: none;
                width: 400px;
                color: white;
                &:focus{
                    outline: none;
                }
            }
        }
    }

    .navbar_right{
        width: 50px;
        height: 50px;
        background-color: rgba(255,255,255, 0.15);
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        img{
            width: 33px;
            border-radius: 50%;
        }
    }
`;

export default Navbar