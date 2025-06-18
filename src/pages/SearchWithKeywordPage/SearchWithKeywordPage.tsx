import React from "react";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import {
  Box,
  Typography,
  Grid,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SEARCH_TYPE } from "../../models/search";
import AlbumCard from "../../common/components/AlbumCard";
import TrackListItem from "../../common/components/TrackListItem";
import ArtistCard from "../../common/components/ArtistCard";
import { useParams } from "react-router";
import LoadingSpinner from "../../common/components/LoadingSpinner";

const SearchResultContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: "100dvh",
  overflow: "hidden",
  marginTop: "20px",
  background: "linear-gradient(to bottom,rgb(53, 53, 53) 0%, #121212 100%)",
  borderRadius: "8px",
  maxWidth: "100%",
});

const ScrollableContainer = styled(Box)({
  overflowY: "auto",
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE & Edge
  "&::-webkit-scrollbar": {
    display: "none", // Chrome, Safari
  },
});

const SearchTrackListContainer = styled(Box)({
  backgroundColor: "#181818",
  padding: "8px",
  borderRadius: "8px",
  maxHeight: "270px",
  overflowY: "auto",
  pr: 1,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});
const BackgroundPaper = styled(Box)({
  backgroundColor: "#181818",
  padding: "8px",
  borderRadius: "8px",
});

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const { data, isLoading } = useSearchItemsByKeyword({
    q: keyword ?? "",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
    limit: 10,
  });
  const tracks = data?.pages.flatMap((page) => page.tracks?.items || []) || [];
  const artists =
    data?.pages.flatMap((page) => page.artists?.items || []) || [];
  const albums = data?.pages.flatMap((page) => page.albums?.items || []) || [];

  const noResult =
    tracks.length === 0 && artists.length === 0 && albums.length === 0;
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  let visibleCount = 4;
  if (isXl) visibleCount = 6;
  else if (isLg) visibleCount = 6;
  else if (isMd) visibleCount = 6;

  if (isLoading) return <LoadingSpinner />;

  return (
    <SearchResultContainer p={3}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        "{keyword}" 검색 결과
      </Typography>
      {noResult ? (
        <Typography variant="body1">
          검색어에 해당하는 결과값이 존재하지 않습니다.
        </Typography>
      ) : (
        <ScrollableContainer>
          <Grid container spacing={2} mb={5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                상위 결과
              </Typography>

              {tracks[0] ? (
                <BackgroundPaper>
                  <Box sx={{ width: "195px" }}>
                    <AlbumCard
                      image={tracks[0].album?.images?.[0]?.url || ""}
                      name={tracks[0].name || "Unknown"}
                      artistName={tracks[0].artists?.[0]?.name || "Unknown"}
                    />
                  </Box>
                </BackgroundPaper>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  상위 결과가 없습니다.
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" gutterBottom>
                노래
              </Typography>
              {tracks.length > 0 ? (
                <SearchTrackListContainer>
                  {tracks.map((track) => (
                    <TrackListItem key={track.id} track={track} />
                  ))}
                </SearchTrackListContainer>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  노래 결과가 없습니다.
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Artists */}
          <Box mb={5} sx={{ width: "100%" }}>
            <Typography variant="h6" gutterBottom>
              아티스트
            </Typography>
            {artists.length > 0 ? (
              <Grid container>
                {artists.slice(0, visibleCount).map((artist) => (
                  <Grid key={artist.id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <BackgroundPaper sx={{ borderRadius: 0 }}>
                      <ArtistCard
                        image={artist.images?.[0]?.url || ""}
                        name={artist.name || "Unknown"}
                        artistName={"Artist"}
                      />
                    </BackgroundPaper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary">
                아티스트 결과가 없습니다.
              </Typography>
            )}
          </Box>

          {/* Albums */}
          <Box>
            <Typography variant="h6" gutterBottom>
              앨범
            </Typography>
            {albums.length > 0 ? (
              <Grid container>
                {albums.slice(0, visibleCount).map((album) => (
                  <Grid key={album.id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <BackgroundPaper sx={{ borderRadius: 0 }}>
                      <AlbumCard
                        image={album.images?.[0]?.url || ""}
                        name={album.name || "Unknown"}
                        artistName={album.artists?.[0]?.name || "Unknown"}
                      />
                    </BackgroundPaper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary">
                앨범 결과가 없습니다.
              </Typography>
            )}
          </Box>
        </ScrollableContainer>
      )}
    </SearchResultContainer>
  );
};

export default SearchWithKeywordPage;