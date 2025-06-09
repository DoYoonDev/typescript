import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useGetCurrentUserPlaylists from "../hooks/useGetCurrentUserPlaylists";
import LoadingSpinner from "../common/components/LoadingSpinner";
import ErrorMessage from "../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));
const token = localStorage.getItem("access_token");
const Library = () => {
  const {
    data,
    isLoading,
    error,
  } = useGetCurrentUserPlaylists({ limit: 15, offset: 0 }, { enabled: !!token});
 
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      {!data ||data?.total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
            <Playlist playlists={data.items} />
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;

function useAuthStore(arg0: (state: any) => any) {
  throw new Error("Function not implemented.");
}

