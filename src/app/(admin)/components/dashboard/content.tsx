"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PeopleIcon from "@mui/icons-material/People";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSession } from "next-auth/react";

const DashboardContent = () => {
  const { data: session } = useSession();
  console.log("session", session);

  // Mock data for the current user
  const currentUser = {
    name: session?.user?.name || "Admin",
    role: "Admin",
    avatar: "https://source.unsplash.com/random/100x100?portrait=5",
    notifications: 3,
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Welcome back, {currentUser.name}!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You have {currentUser.notifications} new notifications and 15 tracks
          pending review.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 3,
        }}
      >
        {[
          {
            title: "Total Tracks",
            value: "1,234",
            icon: <AudiotrackIcon color="primary" />,
          },
          {
            title: "Total Users",
            value: "45,678",
            icon: <PeopleIcon color="secondary" />,
          },
          {
            title: "Total Plays",
            value: "2.3M",
            icon: <MusicNoteIcon sx={{ color: "#ff5722" }} />,
          },
          {
            title: "Total Likes",
            value: "987K",
            icon: <FavoriteIcon sx={{ color: "#e91e63" }} />,
          },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                mb: 1,
                p: 1,
                borderRadius: "50%",
                bgcolor: "rgba(0,0,0,0.04)",
              }}
            >
              {item.icon}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {item.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardContent;
