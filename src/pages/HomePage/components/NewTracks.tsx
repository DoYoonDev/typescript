import React from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Grid, Typography } from "@mui/material";
import AlbumCard from "../../../common/components/AlbumCard";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

const NewTracks = () => {
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: "genre:k-pop year:2024",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album],
    limit: 6,
    market: "ES",
  });
  console.log("new tracks:", data);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  const tracks = data?.pages?.flatMap((page) => page.tracks?.items || []) ?? [];
  return (
    <div>
      <Typography variant="h1" paddingTop="8px" marginBottom="8px">
        최신 음악
      </Typography>

      {tracks && tracks.length > 0 ? (
        <Grid container spacing={2}>
          {tracks.map((track) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={track.id}>
              <AlbumCard
                image={track.album?.images[0].url || "No Image"}
                name={track.name || "Unknown"}
                artistName={track.artists?.[0].name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </div>
  );
};

export default NewTracks;