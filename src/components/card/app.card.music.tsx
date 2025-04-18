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
import { useRouter } from "next/navigation";

interface IProps {
  data: ITrackTop;
}

const StyledCard = styled(Card)`
  display: flex;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #ffffff;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`;

const PlayButton = styled(IconButton)`
  background: #3b82f6;
  color: #ffffff;
  padding: 8px;

  &:hover {
    background: #2563eb;
  }

  transition: all 0.3s ease;
`;

const ActionButton = styled(IconButton)`
  color: #6b7280;

  &:hover {
    color: #1f2937;
    background: rgba(0, 0, 0, 0.05);
  }

  transition: all 0.3s ease;
`;

export default function AppCardMusic(props: IProps) {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const { data } = props;
  const router = useRouter();

  const handleDetailOnClick = () => {
    router.push(`/track/${data._id}?audio=${data.trackUrl}`);
  };

  return (
    <StyledCard>
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 140, md: 160 }, // Full width on xs
          height: { xs: 120, sm: 140, md: 160 },
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: { xs: "12px 12px 0 0", sm: "12px 0 0 12px" },
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
            opacity: { xs: 0.5, md: 0 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: { xs: "12px 12px 0 0", sm: "12px 0 0 12px" },
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <PlayButton aria-label="play">
            <PlayArrowIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
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
          width: { xs: "100%", sm: "auto" },
          cursor: "pointer",
          padding: "8px",
        }}
      >
        <CardContent sx={{ padding: { xs: "8px", sm: "12px 16px" } }}>
          <Box
            onClick={handleDetailOnClick}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: { xs: 0.5, md: 1 },
              cursor: "pointer",
            }}
          >
            <Typography
              component="div"
              variant="h6"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 600,
                color: "#1f2937",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "80%",
                "&:hover": {
                  color: "#3b82f6",
                  textDecorationThickness: "2px",
                },
              }}
            >
              {data.title}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              color: "#6b7280",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1,
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
            }}
          >
            {data.description}
          </Typography>

          <Box sx={{ display: "flex", gap: { xs: 1, sm: 1.5, md: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <FavoriteBorderIcon
                sx={{ fontSize: { xs: 14, md: 16 }, color: "#f43f5e" }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "#4b5563",
                  fontSize: { xs: "0.65rem", md: "0.75rem" },
                }}
              >
                {data.countLike}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PlayArrowIcon
                sx={{ fontSize: { xs: 14, md: 16 }, color: "#3b82f6" }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "#4b5563",
                  fontSize: { xs: "0.65rem", md: "0.75rem" },
                }}
              >
                {data.countPlay} plays
              </Typography>
            </Box>
            <Box>
              <ActionButton size="small" aria-label="share">
                <ShareIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
              </ActionButton>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </StyledCard>
  );
}
