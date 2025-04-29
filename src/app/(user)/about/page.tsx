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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LanguageIcon from "@mui/icons-material/Language";
import CloudIcon from "@mui/icons-material/Cloud";
import PeopleIcon from "@mui/icons-material/People";
import SpeedIcon from "@mui/icons-material/Speed";
import StorageIcon from "@mui/icons-material/Storage";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

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
  0% { box-shadow: 0 0 5px rgba(0, 198, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 198, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 198, 255, 0.3); }
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
    background: "linear-gradient(120deg, #001E3C 0%, #0A1929 100%)",
    zIndex: -1,
  },
});

const GradientText = styled(Typography)({
  background: "linear-gradient(90deg, #00C6FF 0%, #0072FF 50%, #00C6FF 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${moveBackground} 5s linear infinite`,
  transition: "text-shadow 0.3s ease",
  "&:hover": {
    textShadow: "0 0 15px rgba(0, 198, 255, 0.8)",
    animation: `${moveBackground} 2s linear infinite`, // Speed up on hover
  },
});

const FeatureCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "32px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-10px) scale(1.02)",
    border: "1px solid rgba(0, 198, 255, 0.5)",
    background:
      "linear-gradient(45deg, rgba(0, 198, 255, 0.05), rgba(0, 114, 255, 0.05))",
    animation: `${glowAnimation} 1.5s ease-in-out infinite`,
    "& .ripple": {
      animation: `${rippleAnimation} 1.2s cubic-bezier(0, 0, 0.2, 1) infinite`,
    },
    "& .feature-icon": {
      transform: "scale(1.2) ",
    },
  },
});

const FloatingElement = styled(Box)({
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  transition: "transform 0.3s ease",
  "&:hover": {
    animation: `${pulseAnimation} 0.8s ease-in-out`,
    "& .music-icon": {
      transform: "rotate(20deg)", // Rotate music note on hover
    },
  },
});

const GlowingButton = styled(Button)({
  background: "linear-gradient(45deg, #00C6FF 30%, #0072FF 90%)",
  borderRadius: "30px",
  border: 0,
  color: "white",
  padding: "12px 30px",
  boxShadow: "0 3px 5px 2px rgba(0, 198, 255, .3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05) skew(-2deg)", // Add skew for playful effect
    boxShadow: "0 6px 15px 4px rgba(0, 198, 255, .5)",
    animation: `${pulseAnimation} 0.6s ease-in-out`,
    background: "linear-gradient(45deg, #0072FF 30%, #00C6FF 90%)", // Reverse gradient
  },
});

const StatsChip = styled(Chip)({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "15px",
  padding: "20px 10px",
  transition: "all 0.3s ease",
  "& .MuiChip-label": {
    fontSize: "1.1rem",
    padding: "0 16px",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    background: "rgba(0, 198, 255, 0.1)",
    border: "1px solid rgba(0, 198, 255, 0.4)",
    animation: `${glowAnimation} 1.5s ease-in-out infinite`,
  },
});

const AboutPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: (
        <CloudIcon
          className="feature-icon"
          sx={{
            fontSize: 40,
            color: "#00C6FF",
            transition: "transform 0.3s ease",
          }}
        />
      ),
      title: "Cloud Streaming",
      description:
        "Stream your music from anywhere in the world with our cloud infrastructure",
    },
    {
      icon: (
        <SpeedIcon
          className="feature-icon"
          sx={{
            fontSize: 40,
            color: "#0072FF",
            transition: "transform 0.3s ease",
          }}
        />
      ),
      title: "High Performance",
      description:
        "Lightning-fast streaming with minimal latency and buffer time",
    },
    {
      icon: (
        <StorageIcon
          className="feature-icon"
          sx={{
            fontSize: 40,
            color: "#00C6FF",
            transition: "transform 0.3s ease",
          }}
        />
      ),
      title: "Unlimited Storage",
      description:
        "Store your entire music collection without worrying about space",
    },
    {
      icon: (
        <PeopleIcon
          className="feature-icon"
          sx={{
            fontSize: 40,
            color: "#0072FF",
            transition: "transform 0.3s ease",
          }}
        />
      ),
      title: "Social Features",
      description:
        "Connect with your friends and share all of your favorite songs and playlists.",
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
        background: "linear-gradient(135deg, #0A1929 0%, #001E3C 100%)",
      }}
    >
      <StyledContainer maxWidth="lg">
        {/* Hero Section */}
        <Stack spacing={8} alignItems="center" sx={{ mb: 15 }}>
          <Box sx={{ textAlign: "center", maxWidth: 900, mx: "auto" }}>
            <FloatingElement>
              <MusicNoteIcon
                className="music-icon"
                sx={{
                  fontSize: 60,
                  color: "#00C6FF",
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
              The Future of Music is Here
            </GradientText>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                mb: 5,
                lineHeight: 1.8,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
              }}
            >
              Experience music like never before with our cutting-edge streaming
              platform. Discover, share, and enjoy millions of tracks in
              stunning quality.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <GlowingButton
                variant="contained"
                startIcon={<PlayArrowIcon />}
                size="large"
              >
                Start Listening
              </GlowingButton>
              <GlowingButton
                variant="outlined"
                startIcon={<LanguageIcon />}
                size="large"
                sx={{
                  background: "transparent",
                  border: "2px solid #00C6FF",
                  "&:hover": {
                    border: "2px solid #0072FF",
                    animation: `${pulseAnimation} 0.6s ease-in-out`,
                  },
                }}
              >
                Explore Features
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
            {["20M+ Users", "100M+ Tracks", "500K+ Artists"].map(
              (stat, index) => (
                <StatsChip
                  key={index}
                  label={stat}
                  sx={{
                    minWidth: { xs: "100%", sm: "200px" },
                    color: "#00C6FF",
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
                        background: "rgba(0, 198, 255, 0.3)",
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
                        background: "linear-gradient(45deg, #00C6FF, #0072FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
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
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(10px)",
            borderRadius: "30px",
            p: { xs: 4, md: 8 },
            border: "1px solid rgba(255, 255, 255, 0.05)",
            transition: "all 0.3s ease",
            "&:hover": {
              border: "1px solid rgba(0, 198, 255, 0.3)",
              background: "rgba(0, 198, 255, 0.02)",
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: "linear-gradient(45deg, #00C6FF, #0072FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ready to Transform Your Music Experience?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mb: 4,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Join millions of music lovers and start your journey today.
          </Typography>
          <GlowingButton
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
          >
            Get Started Now
          </GlowingButton>
        </Box>
      </StyledContainer>
    </Box>
  );
};

export default AboutPage;
