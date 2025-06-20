import { Box, colors, styled, Typography, } from '@mui/material'
import React from 'react'
import { NavLink, Outlet, } from 'react-router'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from '../components/LibraryHead';
import Library from '../components/Library';
import Navbar from '../components/Navbar';

const Layout = styled("div")({
    display: 'flex',
    height: '100vh',
    padding: '8px',
    overflowX: 'hidden',
});

const Sidebar = styled("div")(({ theme }) => ({
    width: '331px',
    height: "100%",
    display: 'flex',
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
        display: "none"
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    flex: 1,
    minWidth: 0,
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: "8px",
    marginBottom: "8px",
    [theme.breakpoints.down("sm")]: {
        overflowX: "hidden",
    },
}));

const NavList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margint: 0
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.text.primary,
    },
    "&.active": {
        color: theme.palette.primary.main,
        fontWeight: 700,
    },
}));
const AppLayout = () => {
    return (
        <Layout>
            <Sidebar>
                <ContentBox>
                    <NavList>
                        <StyledNavLink to={'/'} end>
                            <HomeIcon />
                            <Typography variant="h2" fontWeight={700}>Home</Typography>
                        </StyledNavLink>
                        <StyledNavLink to={'/search'}>
                            <SearchIcon />
                            <Typography variant='h2' fontWeight={700}>Search</Typography>
                        </StyledNavLink>
                    </NavList>
                </ContentBox>
                <ContentBox>
                    <LibraryHead />
                    <Library />
                </ContentBox>
            </Sidebar>
            <ContentBox>
                <Navbar />
                <Outlet />
            </ContentBox>
        </Layout>
    )
}

export default AppLayout
