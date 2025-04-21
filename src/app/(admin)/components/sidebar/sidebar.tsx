"use client";
import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Badge,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NotificationsIcon from "@mui/icons-material/Notifications";

const SidebarComponent = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const currentUser = {
    name: session?.user?.name || "Admin",
    role: "Admin",
    avatar: "https://source.unsplash.com/random/100x100?portrait=5",
    notifications: 3,
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        collapsedWidth="70px"
        collapsed={collapsed}
        rootStyles={{
          background:
            "linear-gradient(180deg, rgb(70, 0, 175) 0%, rgba(124,58,237,1) 100%)",
          color: "#fff",
          borderRight: "none",
          boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            mb: 2,
          }}
        >
          {!collapsed && (
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MusicNoteIcon sx={{ mr: 1 }} /> Zyna Music
            </Typography>
          )}
          {collapsed && <MusicNoteIcon />}
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", mb: 2 }} />

        {/* User Info */}
        {!collapsed && (
          <Box sx={{ px: 2, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  {currentUser.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {currentUser.role}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Sidebar Menu */}
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active ? "rgba(255,255,255,0.1)" : undefined,
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              padding: collapsed ? "10px 5px" : "10px 15px",
              borderRadius: "8px",
              marginBottom: "5px",
              marginLeft: "10px",
              marginRight: "10px",
            }),
            icon: {
              color: "white",
            },
          }}
        >
          <MenuItem icon={<DashboardIcon />} component={<Link href="/admin" />}>
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<AudiotrackIcon />}
            component={<Link href="/admin/tracks" />}
          >
            Tracks
          </MenuItem>
          <MenuItem
            icon={<QueueMusicIcon />}
            component={<Link href="/admin/playlists" />}
          >
            Playlists
          </MenuItem>
          <MenuItem
            icon={<CloudUploadIcon />}
            component={<Link href="/admin/upload" />}
          >
            Upload
          </MenuItem>

          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 2 }} />

          <SubMenu
            label="Analytics"
            icon={<BarChartIcon />}
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              },
              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "rgba(131, 82, 205, 0.9)",
              },
            }}
          >
            <MenuItem
              icon={<TrendingUpIcon />}
              component={<Link href="/admin/analytics/overview" />}
            >
              Overview
            </MenuItem>
            <MenuItem
              icon={<PeopleIcon />}
              component={<Link href="/admin/analytics/audience" />}
            >
              Audience
            </MenuItem>
          </SubMenu>

          <MenuItem
            icon={<PeopleIcon />}
            component={<Link href="/admin/users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<SettingsIcon />}
            component={<Link href="/admin/settings" />}
          >
            Settings
          </MenuItem>

          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 2 }} />

          <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Main Content */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #eaeaea",
            backgroundColor: "white",
          }}
        >
          <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ mr: 2 }}>
            <DehazeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {collapsed ? "Zyna Music Admin" : ""}
          </Typography>
          {collapsed && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton>
                <Badge badgeContent={currentUser.notifications} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar src={currentUser.avatar} alt={currentUser.name} />
            </Box>
          )}
        </Box>

        <Box sx={{ overflow: "auto", height: "calc(100vh - 64px)" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarComponent;
