import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    styled,
    useMediaQuery,
} from '@mui/material'
import React, { useState } from 'react'
import LoginButton from '../common/components/LoginButton'
import useGetCurrentUserProfile from '../hooks/useGetCurrentUserProfile'
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import SearchInput from '../common/components/SearchInput';

const ProfileContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
    "& .MuiPaper-root": {
        color: "white",
        minWidth: "160px",
    },
});

const ProfileMenuItem = styled(MenuItem)({
    "&:hover": {
        backgroundColor: "#444",
    },
});

const Navbar = () => {
    const { data: userProfile, error } = useGetCurrentUserProfile();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const isSearchPage = location.pathname.startsWith("/search");
    const queryClient = useQueryClient();
    const [keyword, setKeyword] = useState<string>("");

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        queryClient.removeQueries({ queryKey: ['current-user-profile'], exact: true });
        handleMenuClose();
    };
    return (
        <Box
            sx={{ 
                display: "flex",
                justifyContent: isSearchPage ? "space-between" : "flex-end", 
                alignItems: "center",
                height: "64px", 
            }}
        >
            {isSearchPage && (
                <Box width="450px">
                    <SearchInput keyword={keyword} onChange={setKeyword} />
                </Box>
            )}
            {userProfile ? (
                <ProfileContainer>
                    <IconButton onClick={handleMenuOpen} size="small">
                        <Avatar
                            src={userProfile.images[0]?.url}
                            alt={userProfile.display_name}
                        />
                    </IconButton>
                    <ProfileMenu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        keepMounted
                    >
                        <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
                    </ProfileMenu>
                </ProfileContainer>
            ) : (
                <LoginButton />
            )}
        </Box>
    )
}

export default Navbar
