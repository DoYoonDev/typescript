import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Box, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DefaultImage from '../../common/components/DefaultImage';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import LoginButton from '../../common/components/LoginButton';
import ErrorMessage from '../../common/components/ErrorMessage';
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';

const PlaylistHeader = styled(Grid)({
  display: "flex",
  flexWrap: "nowrap",         // ✅ 줄바꿈 방지
  alignItems: "stretch",      // ✅ 요소 높이 일치
  background: "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",
  maxWidth: "200px", // ✅ 추가
  [theme.breakpoints.down("md")]: {
    maxWidth: "150px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));



const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />
  const { data: playlist, isLoading: isPlaylistLoading, error: playlistError } = useGetPlaylist({ playlist_id: id });
  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });
  const [ref, inView] = useInView();
  
  if (playlistItemsError || playlistError) {
    if ((playlistItemsError as any)?.error.status === 401) { //로그인을 안해서 권한 없음 에러라면 로그인 버튼 
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          flexDirection="column"
        >
          <Typography variant="h2" fontWeight={700} mb="20px">
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage="Failed to load" />; // 정말 리스트 가져오기 실패라면 fail to load 
  }
  
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <StyledTableContainer>
      <PlaylistHeader container spacing={7}>
        <ImageGrid item sm={12} md={2}>
          {playlist?.images ? (
            <AlbumImage
              src={playlist?.images[0].url}
              alt="playlist_cover.jpg"
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid
          item
          sm={12}
          md={2}
          sx={(theme) => ({
            display: "flex",
            width: "100%",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          })}
        >
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist?.owner?.display_name
                  ? playlist?.owner.display_name
                  : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
        {playlist?.tracks?.total === 0 ?
          <EmptyPlaylistWithSearch />
          :
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => {
                  return (
                    <DesktopPlaylistItem
                      item={item}
                      key={itemIndex}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  )
                }))
              }
              <TableRow sx={{ height: "5px" }} ref={ref} />
              {isFetchingNextPage && <LoadingSpinner />}
            </TableBody>
          </Table>
        }
    </StyledTableContainer>
  )
}

export default PlaylistDetailPage
