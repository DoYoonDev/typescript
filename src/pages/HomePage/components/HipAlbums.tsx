import React from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Grid, Typography } from "@mui/material";
import AlbumCard from "../../../common/components/AlbumCard";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

const HipAlbums = () => {
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: "tag:hipster",
    type: [SEARCH_TYPE.Album],
    limit: 6,
  });
  console.log("hipster:", data);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  const albums = data?.pages?.flatMap((page) => page.albums?.items || []) ?? [];
  return (
    <div>
      <div>
        <Typography variant="h1" paddingTop="8px" marginBottom="8px">
          힙합
        </Typography>

        {albums && albums.length > 0 ? (
          <Grid container spacing={2}>
            {albums.map((album) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
                <AlbumCard
                  image={album.images[0].url || "No Image"}
                  name={album.name || "Unknown"}
                  artistName={album.artists?.[0].name}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h2">No data</Typography>
        )}
      </div>
    </div>
  );
};

export default HipAlbums;