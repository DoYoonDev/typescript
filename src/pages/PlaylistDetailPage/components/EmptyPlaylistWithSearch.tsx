import { Box, InputAdornment, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";
import { TrackObject } from "../../../models/track";

const SearchContainer = styled(Box)({ // 스크롤 디자인 
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
        borderRadius: "4px", // 입력 필드의 둥근 모서리
        backgroundColor: theme.palette.action.active, // 입력 필드의 배경 색상
        color: "white", // 텍스트 색상
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "transparent", // 테두리 색상 제거
        },
        "&:hover fieldset": {
            borderColor: "gray", // 마우스 호버 시 테두리 색상
        },
        "&.Mui-focused fieldset": {
            borderColor: "gray", // 포커스 시 테두리 색상
        },
    },
}));



const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>("");
    // 무한스크롤을 위해 nextpage 관련 추가 
    const {
        data,
        error,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Tarck],
    });
    console.log("ddd", data);
    // 모든 페이지를 가져오기 위해 flatMap으로 바꿈 
    const tracks = (data?.pages.flatMap((page) => page.tracks?.items) ?? []) as TrackObject;
    const hasResults = tracks.length > 0;
    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <Box display="inline-block">
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

            {/* 로딩 중이면 스피너 */}
            {isLoading && <LoadingSpinner />}

            {/* 에러 발생 시 메시지 */}
            {error && (
                <Typography color="error" mt={2}>
                    검색 중 문제가 발생했습니다.
                </Typography>
            )}

            {/* 검색 결과 없음 메시지 */}
            {!isLoading && keyword && !hasResults && (
                <Typography mt={2}>검색 결과가 없습니다.</Typography>
            )}

            {/* 검색 결과 표시 */}
            {hasResults && (
                <SearchResultList
                    list={tracks}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                />
            )}
        </Box>
    );
};

export default EmptyPlaylistWithSearch;



