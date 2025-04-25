"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Container } from "@mui/material";
import { Avatar } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const linkStyle = {
  textDecoration: "unset",
  color: "unset",
};

export default function AppHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    // Close the menu first
    handleMenuClose();
    // Sign out with a callback to redirect to signin page
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  // Function to get user initials for Avatar
  const getUserInitials = (): string => {
    if (!session || !session.user) return "ER";

    // Try to get initials from username
    if (session.user.username && typeof session.user.username === "string") {
      return session.user.username.substring(0, 2).toUpperCase();
    }

    // Fallback to name
    if (session.user.name && typeof session.user.name === "string") {
      return session.user.name.substring(0, 2).toUpperCase();
    }

    // Default fallback
    return "ER";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {session?.user.role === "ADMIN" && (
        <MenuItem onClick={handleMenuClose} sx={{ "> a": linkStyle }}>
          <Link href="/admin">Admin</Link>
        </MenuItem>
      )}
      <MenuItem onClick={handleMenuClose} sx={{ "> a": linkStyle }}>
        <Link href="/profile">Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ "> a": linkStyle }}>
        <Link href="/profile">My account</Link>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose} sx={{ "> a": linkStyle }}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <Link href="/settings">Settings</Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <span>Logout</span>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <MenuItem sx={{ "> a": linkStyle }}>
          <IconButton size="large" aria-label="home" color="inherit">
            <HomeIcon />
          </IconButton>
          <Link href="/">Home</Link>
        </MenuItem>
        <MenuItem sx={{ "> a": linkStyle }}>
          <IconButton size="large" aria-label="about" color="inherit">
            <InfoIcon />
          </IconButton>
          <Link href="/about">About</Link>
        </MenuItem>
        <MenuItem sx={{ "> a": linkStyle }}>
          <IconButton size="large" aria-label="playlist" color="inherit">
            <LibraryMusicIcon />
          </IconButton>
          <Link href="/playlist">Playlist</Link>
        </MenuItem>
        <MenuItem sx={{ "> a": linkStyle }}>
          <IconButton size="large" aria-label="likes" color="inherit">
            <FavoriteBorderIcon />
          </IconButton>
          <Link href="/likes">Likes</Link>
        </MenuItem>
        <MenuItem sx={{ "> a": linkStyle }}>
          <IconButton size="large" aria-label="upload" color="inherit">
            <FileUploadIcon />
          </IconButton>
          <Link href="/upload">Upload</Link>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Box>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(180deg, rgba(76,29,149,1) 0%, rgba(124,58,237,1) 100%)",
          color: "#fff",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Zyna Music
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            {session ? (
              <>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    gap: "15px",
                    alignItems: "center",
                    "> a": linkStyle,
                  }}
                >
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                  <Link href="/playlist">Playlist</Link>
                  <Link href="/likes">Likes</Link>
                  <Link href="/track/upload">Upload</Link>
                  <Avatar
                    onClick={handleProfileMenuOpen}
                    sx={{ cursor: "pointer" }}
                  >
                    {getUserInitials()}
                  </Avatar>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <div
                onClick={() => router.push("/auth/signin")}
                style={{ cursor: "pointer" }}
              >
                Sign in
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
