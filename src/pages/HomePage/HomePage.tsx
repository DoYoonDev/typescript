import React from 'react'
import NewReleases from './components/NewReleases'
import NewTracks from './components/NewTracks';
import { Box, styled } from '@mui/material';
import OldTracks from './components/OldTracks';
import HipAlbums from './components/HipAlbums';


const ScrollContainer = styled(Box)({
  maxHeight: "100dvh",
  overflowY: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const HomePage = () => {
  return (
    <div>
      <ScrollContainer style={{ maxHeight: "100dvh", overflowY: "auto" }}>
        <NewReleases />
        <NewTracks />
        <OldTracks />
        <HipAlbums />
      </ScrollContainer>
    </div>
  )
}

export default HomePage
