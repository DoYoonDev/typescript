import React from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Box, styled, Typography} from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DefaultImage from '../../common/components/DefaultImage';

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

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id || "" });
  if (id === undefined) return <Navigate to="/" />
  return (
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
  )
}

export default PlaylistDetailPage
