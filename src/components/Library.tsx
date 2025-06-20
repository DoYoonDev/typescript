import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useGetCurrentUserPlaylists from "../hooks/useGetCurrentUserPlaylists";
import LoadingSpinner from "../common/components/LoadingSpinner";
import ErrorMessage from "../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "scroll", // 세로 스크롤 허용
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  WebkitOverflowScrolling: "touch", // iOS에서 부드러운 스크롤
  scrollbarWidth: "none",           // Firefox
  msOverflowStyle: "none",          // IE, Edge
  "&::-webkit-scrollbar": {
    display: "none",                // Chrome, Safari
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));


const Library = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  const { data: user } = useGetCurrentUserProfile();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (!user) return <EmptyPlaylist />;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  console.log("플레이리스트 data : ", data);
  return (
    <div>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <Playlist playlists={page.items} key={index} />
          ))}
          <div ref={ref}>
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;