import { useInView } from "react-intersection-observer";
import { TrackObject } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  TableBody, // ✅ 추가
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { addTracksToPlaylist } from "../../../apis/playlistApi";

const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

interface SearchResultListProps {
  list: TrackObject[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  playlistId: string;
  onTrackAdded: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  playlistId,
  onTrackAdded,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <TableBody> {/* ✅ <div> 대신 <TableBody>로 변경하여 <tr>를 포함할 수 있도록 함 */}
      {list.map((track) => (
        <StyledTableRow key={track.id}>
          <TableCell>
            <Box display="flex" alignItems="center">
              <Box>
                <AlbumImage src={track.album?.images[0].url} width="40px" />
              </Box>
              <Box>
                <Typography fontWeight={700}>{track.name}</Typography>
                <Typography color="text.secondary">
                  {track.artists ? track.artists[0].name : "Unknown Artist"}
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>{track.album?.name}</TableCell>
          <TableCell>
            <Button
              onClick={async () => {
                try {
                  const uri = `spotify:track:${track.id}`;
                  await addTracksToPlaylist(playlistId, [uri]);
                  onTrackAdded();
                } catch (err) {
                  console.error("Track 추가 실패", err);
                }
              }}
            >
              Add
            </Button>
          </TableCell>
        </StyledTableRow>
      ))}

      <TableRow> {/* ✅ 무한스크롤 로딩 바인딩도 TableRow 내부에 포함 */}
        <TableCell colSpan={3}>
          <div ref={ref} style={{ height: 1 }} />
          {isFetchingNextPage && <LoadingSpinner />}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default SearchResultList;