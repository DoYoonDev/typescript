import React from "react";
import { Avatar, Box, Button, List, ListItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useAddTrackToPlaylist from "../../../hooks/useAddTrackToPlaylist";
import { useParams } from "react-router";
import { TrackObject } from "../../../models/track";

interface SearchResultListProps {
  list: TrackObject[];
}

const SearchResultList = ({ list }: SearchResultListProps) => {
  const { id: playlist_id } = useParams<{ id: string }>();

  const { mutate: addTrack } = useAddTrackToPlaylist();

  const handleAddClick = (track: TrackObject) => {
    if (!track.uri) {
      console.warn("❌ 트랙에 uri 없음:", track);
      return;
    }
    addTrack({
      playlist_id: playlist_id!,
      uris: [track.uri],
    });
  };
  return (
    <List sx={{ maxWidth: "100%", width: "100%" }}>
      {list.map((track) => (
        <ListItem
          key={track.id}
          sx={{
            maxWidth: "100%",
            width: "100%",
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
            borderRadius: 1,
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "#2a2a2a",
            },
          }}
        >
          <Box display="flex" gap={2}>
            <Button
              variant="text"
              sx={{
                color: "#1ED760",
                fontWeight: 500,
                minWidth: "50px",
              }}
              onClick={() => handleAddClick(track)}
            >
              <AddIcon />
            </Button>

            <Avatar
              variant="square"
              src={track.album?.images?.[0]?.url}
              alt={track.name}
              sx={{ width: 48, height: 48, borderRadius: "8px" }}
            />
          </Box>

          <Box display="flex" width="100%" gap={2}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" color="text.secondary" noWrap>
                제목
              </Typography>
              <Typography fontWeight={600} noWrap>
                {track.name}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" color="text.secondary" noWrap>
                아티스트
              </Typography>
              <Typography fontWeight={600} noWrap>
                {track.artists?.map((artist) => artist.name).join(", ")}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" color="text.secondary" noWrap>
                앨범
              </Typography>
              <Typography fontWeight={600} noWrap>
                {track.album?.name}
              </Typography>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResultList;