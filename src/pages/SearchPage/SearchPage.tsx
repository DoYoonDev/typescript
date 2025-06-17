import React from "react";
import { Box, Typography, Grid, Paper, styled } from "@mui/material";
import useGetBrowseCategories from "../../hooks/useGetBrowseCategories";


const SearchPageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: "100dvh",
  overflow: "hidden",
  marginTop: "20px",
});
const getRandomColor = () => {
  const colors = [
    "#FF6B6B",
    "#6BCB77",
    "#4D96FF",
    "#FFD93D",
    "#A66DD4",
    "#FFB26B",
    "#6B8E23",
    "#00B8A9",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const SearchPage = () => {
  const { data } = useGetBrowseCategories();
  const categories = data?.categories.items || [];

  return (
    <SearchPageContainer>
      <Typography variant="h5" fontWeight={600} my={2}>
        카테고리
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          paddingTop: "10px",
          pr: 1,
          pb: 2,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* 카테고리 카드 보여주기 */}
        <Grid container spacing={3}>
          {categories.map((category) => {
            const backgroundColor = getRandomColor();
            const image = category.icons?.[0]?.url || "";
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.id}>
                <Paper
                  sx={{
                    p: 2,
                    height: 180,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${backgroundColor} 0%, #000 100%)`,
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: "2px dotted white",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: 4,
                    display: "flex",
                    alignItems: "flex-end",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                    }}
                  >
                    <Typography fontWeight={700} fontSize="1rem" zIndex={2}>
                      {category.name}
                    </Typography>
                  </Box>
                  {image && (
                    <Box
                      component="img"
                      src={image}
                      alt={category.name}
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        width: 110,
                        height: 110,
                        objectFit: "cover",
                        borderRadius: 2,
                        opacity: 0.9,
                        zIndex: 1,
                      }}
                    />
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </SearchPageContainer>
  );
};

export default SearchPage;