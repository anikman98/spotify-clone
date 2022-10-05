import React from 'react'
import styled from 'styled-components'
import Playlist from './Playlist'

const Sidebar = () => {
  return (
    <Container>
        <div className="library">
            <ul>
                <li>
                    <div className="library_icon icon">
                        <svg role="img" height="24" width="24" className="Svg-ytk21e-0 jAKAlG collection-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path></svg>
                    </div>
                    <span>Your Library</span>
                </li>
                <li>
                    <div className="plus_icon icon">
                        <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" className="Svg-ytk21e-0 jAKAlG"><path d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path></svg>
                    </div>
                    <span>Create Playlist</span>
                </li>
                <li>
                    <div className="fav_icon icon">
                        <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" className="Svg-ytk21e-0 jAKAlG"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
                    </div>
                    <span>Liked Songs</span>
                </li>
            </ul>
        </div>
        <hr className='dash' />
        <div className="playlist">
            <Playlist />
        </div>
    </Container>
  )
}

const Container = styled.div`
    height: 100%;
    padding: 0 0.7rem;

    .library{

        ul{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 0;
            padding-top: 10px;
            margin: 0;
            fill: #C0C0C0;
            color: #C0C0C0;
            gap: 1rem;
            list-style-type: none;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
        }
        
        li{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;

            .icon{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 25px;
                height: 25px;
            }

            .plus_icon{
                width: 25px;
                height: 25px;
                background-color: #DCDCDC;
                fill: black;
                border-radius: 3px;
            }

            .fav_icon{
                width: 25px;
                height: 25px;
                background: linear-gradient(to bottom right, blue, lightgrey);
                fill:white;
                border-radius: 3px;
            }

            &:hover{
                color: white;
            }
        }
    }

    .dash{
        background-color: #282828;
        height: 1px;
        border: none;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    
`;

export default Sidebar