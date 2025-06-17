import React, { KeyboardEvent, useRef } from "react";
import { TextField, InputAdornment, Paper, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";


interface SearchInputProps {
  keyword: string;
  onChange: (value: string) => void;
}

const StyledSearchWrapper = styled(Paper)(({ theme }) => ({
  position: "relative",
  maxWidth: 495,
  margin: "0 auto",
  borderRadius: theme.spacing(1),
}));

const SearchInput = ({ keyword, onChange }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/search/${encodeURIComponent(keyword.trim())}`);
      inputRef.current?.blur();
    }
  };

  return (
    <StyledSearchWrapper elevation={3}>
      <TextField
        fullWidth
        value={keyword}
        placeholder="노래를 검색해주세요"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => onChange("")}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#1ed760" }} />
            </InputAdornment>
          ),
        }}
      />
    </StyledSearchWrapper>
  );
};

export default SearchInput;