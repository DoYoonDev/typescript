import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
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
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'stretch',
  background: 'linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
  padding: '16px',
});

const ImageGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

const AlbumImage = styled('img')(({ theme }) => ({
  borderRadius: '8px',
  height: 'auto',
  width: '100%',
  maxWidth: '200px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '150px',
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: 'calc(100% - 64px)',
  borderRadius: '8px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const playlistId = id ?? ''; // ✅ 조건부 hook 방지

  const { data: playlist, isLoading: isPlaylistLoading, error: playlistError } =
    useGetPlaylist({ playlist_id: playlistId });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({
    playlist_id: playlistId,
    limit: PAGE_LIMIT,
    offset: 0,
  });

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!id) {
    return <Navigate to="/" />;
  }

  if (playlistItemsError || playlistError) {
    if ((playlistItemsError as any)?.error?.status === 401) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%" flexDirection="column">
          <Typography variant="h2" fontWeight={700} mb="20px">
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage="Failed to load" />;
  }

  const allItems = playlistItems?.pages.flatMap((p) => p.items) ?? [];
  const isEmpty = allItems.length === 0;
  const isLoadingOrRefetching = isPlaylistItemsLoading || isFetchingNextPage;

  return (
    <StyledTableContainer>
      <PlaylistHeader container spacing={7}>
        <ImageGrid item xs={12} md={2}> {/* ✅ 'item' 오류 해결: xs 대신 sm */}
          {playlist?.images ? (
            <AlbumImage src={playlist?.images[0].url} alt="playlist_cover.jpg" />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>

        <Grid
          item
          xs={12}
          md={2}
          sx={(theme) => ({
            display: 'flex',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
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
              <Typography variant="subtitle1" color="white" ml={1} fontWeight={700}>
                {playlist?.owner?.display_name ?? 'unknown'}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>

      {/* ✅ 테이블과 비어있는 검색 UI는 완전히 분리 */}
      {isEmpty && !isLoadingOrRefetching ? (
        <EmptyPlaylistWithSearch />
      ) : (
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
              page.items.map((item, itemIndex) => (
                <DesktopPlaylistItem
                  item={item}
                  key={itemIndex}
                  index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                />
              ))
            )}
            <TableRow ref={ref}>
              <TableCell colSpan={5}>
                {isFetchingNextPage && <LoadingSpinner />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </StyledTableContainer>
  );
};

export default PlaylistDetailPage;
