"use client";
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ITracks } from "@/types/next-auth";

interface ModalViewTrackProps {
  open: boolean;
  handleClose: () => void;
  track?: ITracks;
}

const ModalViewTrack: React.FC<ModalViewTrackProps> = ({
  open,
  handleClose,
  track,
}) => {
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Track Details
        <Button
          onClick={handleClose}
          color="secondary"
          aria-label="Close dialog"
        >
          <ClearIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        {track ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              mt: 2,
            }}
          >
            <TextField
              label="ID"
              variant="outlined"
              fullWidth
              //@ts-ignore
              value={track.id || "N/A"}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={track.title || "N/A"}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={track.description || "N/A"}
              multiline
              rows={3}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              value={track.category || "N/A"}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={track.imgUrl || "N/A"}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Track URL"
              variant="outlined"
              fullWidth
              value={track.trackUrl || "N/A"}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Likes"
              variant="outlined"
              fullWidth
              value={track.countLike || 0}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Plays"
              variant="outlined"
              fullWidth
              value={track.countPlay || 0}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Uploader"
              variant="outlined"
              fullWidth
              value={track.uploader?.name || "Unknown"}
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Created At"
              variant="outlined"
              fullWidth
              value={
                track.createdAt
                  ? new Date(track.createdAt).toLocaleString()
                  : "N/A"
              }
              disabled
              sx={inputStyles}
            />
            <TextField
              label="Updated At"
              variant="outlined"
              fullWidth
              value={
                track.updatedAt
                  ? new Date(track.updatedAt).toLocaleString()
                  : "N/A"
              }
              disabled
              sx={inputStyles}
            />
          </Box>
        ) : (
          <Typography align="center" color="textSecondary">
            No track data available.
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalViewTrack;
