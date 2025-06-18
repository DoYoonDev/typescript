import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { TrackObject } from "../../models/track";
import useAddTrackToPlaylist from "../../hooks/useAddTrackToPlaylist";

interface Props {
  track: TrackObject;
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TrackListItem = ({ track }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const open = Boolean(anchorEl);
  const { data: userProfile } = useGetCurrentUserProfile();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

  const { mutate: addTrack } = useAddTrackToPlaylist();

  const playlists =
    data?.pages
      .flatMap((page) => page.items)
      .filter((playlist) => playlist.owner?.id === userProfile?.id) || [];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToPlaylist = (playlist_id: string) => {
    if (!track.uri) {
      console.warn("트랙에 uri 없음:", track);
      return;
    }
    addTrack(
      {
        playlist_id: playlist_id,
        uris: [track.uri],
      },
      {
        onSuccess: () => {
          handleClose();
          setOpenSnackbar(true);
        },
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 8px",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "8px",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        <Avatar
          src={track.album?.images?.[0]?.url}
          alt={track.name}
          variant="square"
          sx={{ width: 48, height: 48, borderRadius: 1 }}
        />
        <Box>
          <Typography fontWeight={600}>{track.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {track.artists?.map((a) => a.name).join(", ")}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 50 }}>
        {track.duration_ms ? formatDuration(track.duration_ms) : "-"}
      </Typography>

      <IconButton
        onClick={handleClick}
        sx={{
          borderRadius: "50%",
          color: "white",
          "&:hover": {
            color: "#1ed760",
            backgroundColor: "#343434",
          },
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          style: { maxHeight: 48 * 5, width: "220px", overflowY: "auto" },
          onScroll: (e: React.UIEvent<HTMLElement>) => {
            const target = e.currentTarget;
            const bottom =
              target.scrollHeight - target.scrollTop === target.clientHeight;
            if (bottom && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          },
        }}
      >
        {playlists.length === 0 ? (
          <MenuItem disabled>로그인 후 이용 가능 ⬆️</MenuItem>
        ) : (
          playlists.map((playlist) => (
            <MenuItem
              key={playlist.id}
              onClick={() => {
                if (!playlist.id) return;
                handleAddToPlaylist(playlist.id);
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  display: "inline-block",
                  position: "relative",
                  "&:hover span": {
                    animation: "scroll-left 6s linear infinite",
                    animationDuration: `${Math.max(
                      (playlist.name ?? "").length * 0.3,
                      4
                    )}s`,
                  },
                }}
              >
                <Box component="span" sx={{ display: "inline-block" }}>
                  {playlist.name}
                </Box>
              </Box>
            </MenuItem>
          ))
        )}

        {isFetchingNextPage && (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              불러오는 중...
            </Typography>
          </MenuItem>
        )}
      </Menu>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            fontWeight: 600,
            padding: "16px",
            borderRadius: "8px",
            border: "1px dashed white",
          }}
        >
          플레이리스트에 추가되었습니다!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrackListItem;