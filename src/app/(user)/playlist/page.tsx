"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import GroupIcon from "@mui/icons-material/Group";

// Keyframes for animations
const moveBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const rippleAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(3); opacity: 0; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(2, 136, 209, 0.3); }
  50% { box-shadow: 0 0 20px rgba(2, 136, 209, 0.6); }
  100% { box-shadow: 0 0 5px rgba(2, 136, 209, 0.3); }
`;

// Styled Components
const StyledContainer = styled(Container)({
  position: "relative",
  "&::before": {
    content: '""',
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(120deg, #E0F7FA 0%, #B2EBF2 100%)",
    zIndex: -1,
  },
});

const GradientText = styled(Typography)({
  background: "linear-gradient(90deg, #0288D1 0%, #FF4081 50%, #0288D1 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${moveBackground} 5s linear infinite`,
  transition: "text-shadow 0.3s ease",
  "&:hover": {
    textShadow: "0 0 15px rgba(2, 136, 209, 0.8)",
    animation: `${moveBackground} 2s linear infinite`,
  },
});

const FeatureCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "32px",
  border: "1px solid rgba(2, 136, 209, 0.2)",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-10px) scale(1.02)",
    border: "1px solid rgba(2, 136, 209, 0.5)",
    background:
      "linear-gradient(45deg, rgba(2, 136, 209, 0.1), rgba(255, 64, 129, 0.1))",
    animation: `${glowAnimation} 1.5s ease-in-out infinite`,
    "& .ripple": {
      animation: `${rippleAnimation} 1.2s cubic-bezier(0, 0, 0.2, 1) infinite`,
    },
    "& .feature-icon": {
      transform: "scale(1.2)",
    },
  },
});

const FloatingElement = styled(Box)({
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  transition: "transform 0.3s ease",
  "&:hover": {
    animation: `${pulseAnimation} 0.8s ease-in-out`,
    "& .music-icon": {
      transform: "rotate(20deg)",
    },
  },
});

const GlowingButton = styled(Button)({
  background: "linear-gradient(45deg, #0288D1 30%, #FF4081 90%)",
  borderRadius: "30px",
  border: 0,
  color: "white",
  padding: "12px 30px",
  boxShadow: "0 3px 5px 2px rgba(2, 136, 209, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05) skew(-2deg)",
    boxShadow: "0 6px 15px 4px rgba(2, 136, 209, 0.5)",
    animation: `${pulseAnimation} 0.6s ease-in-out`,
    background: "linear-gradient(45deg, #FF4081 30%, #0288D1 90%)",
  },
});

const StatsChip = styled(Chip)({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(2, 136, 209, 0.2)",
  borderRadius: "15px",
  padding: "20px 10px",
  transition: "all 0.3s ease",
  "& .MuiChip-label": {
    fontSize: "1.1rem",
    padding: "0 16px",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    background: "rgba(2, 136, 209, 0.2)",
    border: "1px solid rgba(2, 136, 209, 0.4)",
    animation: `${glowAnimation} 1.5s ease-in-out infinite`,
  },
});

const PlaylistPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: (
        <AddCircleIcon
          className="feature-icon"
          sx={{
            fontSize: 40,
            color: "#0288D1",
            transition: "transform 0.3s ease",
          }}
        />
      ),
      title: "Create Playlists",
      description: "Build custom playlists for every mood and occasion.",
    },
    {
      icon: (
        <EditIcon
          className="feature-icon"
          sx={{
            fontSize: 40,
            color: "#FF4081",
            transition: "transform 0.3s ease",
          }}
        />
      ),
      title: "Customize Easily",
      description: "Edit and organize your playlists with a simple interface.",
    },
    {
      icon: (
        <ShareIcon
          className="feature-icon"
          sx={{
            fontSize: 40,
            color: "#0288D1",
            transition: "transform 0.3s ease",
          }}
        />
      ),
      title: "Share Playlists",
      description: "Share your playlists with friends or the community.",
    },
    {
      icon: (
        <GroupIcon
          className="feature-icon"
          sx={{
            fontSize: 40,
            color: "#FF4081",
            transition: "transform 0.3s ease",
          }}
        />
      ),
      title: "Collaborate",
      description: "Invite friends to contribute to your playlists.",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        pt: { xs: 8, md: 12 },
        pb: 8,
        overflow: "hidden",
        background: "#FFF",
      }}
    >
      <StyledContainer maxWidth="lg">
        {/* Hero Section */}
        <Stack spacing={8} alignItems="center" sx={{ mb: 15 }}>
          <Box sx={{ textAlign: "center", maxWidth: 900, mx: "auto" }}>
            <FloatingElement>
              <PlaylistPlayIcon
                className="music-icon"
                sx={{
                  fontSize: 60,
                  color: "#0288D1",
                  mb: 3,
                  transition: "transform 0.3s ease",
                }}
              />
            </FloatingElement>
            <GradientText
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 800,
                mb: 3,
                letterSpacing: -1,
              }}
            >
              Craft Your Perfect Playlists
            </GradientText>
            <Typography
              variant="h5"
              sx={{
                color: "#333",
                mb: 5,
                lineHeight: 1.8,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
              }}
            >
              Create, customize, and share playlists that capture your unique
              music vibe.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <GlowingButton
                variant="contained"
                startIcon={<AddCircleIcon />}
                size="large"
              >
                Create Playlist
              </GlowingButton>
              <GlowingButton
                variant="outlined"
                startIcon={<ShareIcon />}
                size="large"
                sx={{
                  background: "transparent",
                  border: "2px solid #0288D1",
                  color: "#0288D1",
                  "&:hover": {
                    border: "2px solid #FF4081",
                    color: "#fff",
                    animation: `${pulseAnimation} 0.6s ease-in-out`,
                  },
                }}
              >
                Share Playlists
              </GlowingButton>
            </Stack>
          </Box>

          {/* Stats Section */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {["1M+ Playlists", "50M+ Songs", "100K+ Collaborations"].map(
              (stat, index) => (
                <StatsChip
                  key={index}
                  label={stat}
                  sx={{
                    boxShadow: "0 3px 5px 2px rgba(1, 136, 209, 0.2)",
                    minWidth: { xs: "100%", sm: "200px" },
                    color: "#0288D1",
                  }}
                />
              )
            )}
          </Stack>
        </Stack>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 15 }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <FeatureCard>
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Box sx={{ mt: 1, position: "relative" }}>
                    {feature.icon}
                    <Box
                      className="ripple"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgba(2, 136, 209, 0.3)",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        background: "linear-gradient(45deg, #0288D1, #FF4081)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#333",
                        lineHeight: 1.7,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Stack>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: "30px",
            p: { xs: 4, md: 8 },
            border: "1px solid rgba(2, 136, 209, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              border: "1px solid rgba(2, 136, 209, 0.4)",
              background: "rgba(2, 136, 209, 0.1)",
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: "linear-gradient(45deg, #0288D1, #FF4081)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Start Building Your Playlists
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              mb: 4,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Create and share playlists that tell your music story.
          </Typography>
          <GlowingButton
            variant="contained"
            size="large"
            startIcon={<AddCircleIcon />}
          >
            Get Started
          </GlowingButton>
        </Box>
      </StyledContainer>
    </Box>
  );
};

export default PlaylistPage;
