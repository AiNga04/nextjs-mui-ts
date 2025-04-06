"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/material/styles";

interface IProps {
  data: ITrackTop;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  height: "160px",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  background: "#ffffff",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
  },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  background: "#3b82f6",
  color: "#ffffff",
  padding: "6px",
  "&:hover": {
    background: "#2563eb",
    transform: "scale(1.1)",
  },
  transition: "all 0.3s ease",
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: "#6b7280",
  "&:hover": {
    color: "#1f2937",
    background: "rgba(0, 0, 0, 0.05)",
  },
  transition: "all 0.3s ease",
}));

export default function AppCardMusic(props: IProps) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data } = props;

  return (
    <StyledCard>
      {/* Image Section */}
      <Box
        sx={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px 0 0 12px",
          }}
          image={`${backendUrl}/images/${data.imgUrl}`}
          alt={data.title}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px 0 0 12px",
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <PlayButton aria-label="play">
            <PlayArrowIcon sx={{ fontSize: 28 }} />
          </PlayButton>
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto", padding: "12px 16px 8px" }}>
          {/* Title and Category */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Typography
              component="div"
              variant="h6"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#1f2937",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "70%",
              }}
            >
              {data.title}
            </Typography>
          </Box>

          {/* Artist (Description) */}
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              color: "#6b7280",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1.5,
              fontSize: "0.85rem",
            }}
          >
            {data.description}
          </Typography>

          {/* Stats (Likes, Plays and Share) */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <FavoriteBorderIcon sx={{ fontSize: 16, color: "#f43f5e" }} />
              <Typography variant="caption" sx={{ color: "#4b5563" }}>
                {data.countLike}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PlayArrowIcon sx={{ fontSize: 16, color: "#3b82f6" }} />
              <Typography variant="caption" sx={{ color: "#4b5563" }}>
                {data.countPlay} plays
              </Typography>
            </Box>
            <Box>
              <ActionButton size="small" aria-label="share">
                <ShareIcon fontSize="small" />
              </ActionButton>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </StyledCard>
  );
}
