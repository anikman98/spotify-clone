import React from 'react'
import styled from 'styled-components'
import Playlist from './Playlist'

const Sidebar = () => {
  return (
    <Container>
        <div className="library">
            Library
        </div>
        <hr />
        <div className="playlist">
            <Playlist />
        </div>
    </Container>
  )
}

const Container = styled.div`
    height: 100%;
    padding: 0 0.7rem;
    
`;

export default Sidebar