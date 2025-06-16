import { Box, InputAdornment, styled, TableContainer, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";
import { TrackObject } from "../../../models/track";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";

const SearchContainer = styled(Box)({
    padding: "16px",
    width: "100%",
    height: "100%",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        display: "none",
    },
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    "& .MuiInputBase-root": {
        borderRadius: "4px",
        backgroundColor: theme.palette.action.active,
        color: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "transparent",
        },
        "&:hover fieldset": {
            borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
            borderColor: "gray",
        },
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  display: "block", // ✅ 여기서 설정
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>("");
    const { id: playlistId } = useParams<{ id: string }>();
    const [isAdded, setIsAdded] = useState(false);
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track],
    });

    if (!playlistId) return null;
    if (isAdded) return null;


    const tracks =
        (data?.pages.flatMap((page) => page.tracks?.items) ?? []) as TrackObject[];
    const hasResults = tracks.length > 0;

    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <SearchContainer>
            <Typography variant="h1" my="10px">
                Let's find something for your playlist
            </Typography>

            <StyledTextField
                value={keyword}
                autoComplete="off"
                variant="outlined"
                placeholder="Search for songs or episodes"
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    },
                }}
                onChange={handleSearchKeyword}
            />

            {isLoading && <LoadingSpinner />}

            {error && (
                <Typography color="error" mt={2}>
                    검색 중 문제가 발생했습니다.
                </Typography>
            )}

            {!isLoading && keyword && !hasResults && (
                <Typography mt={2}>검색 결과가 없습니다.</Typography>
            )}

            {hasResults && (
                <SearchResultList
                    list={tracks}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                    playlistId={playlistId}
                    onTrackAdded={() => {
                        setIsAdded(true);
                        queryClient.invalidateQueries({
                            queryKey: [
                                "playlist-items",
                                { playlist_id: playlistId, limit: 20, offset: 0 },
                            ],
                        });
                        window.location.reload();
                    }}
                />
            )}
        </SearchContainer>
    );
};

export default EmptyPlaylistWithSearch;
