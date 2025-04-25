"use client";
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { sendRequest } from "@/utils/api";
import { ITracks } from "@/types/next-auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ModalUpdateTrackProps {
  open: boolean;
  handleClose: () => void;
  track?: ITracks;
  fetchTracks: () => void;
}

interface IBackendRes {
  status: number;
  message: string;
  data: any;
}

interface IFormData {
  title: string;
  description: string;
  category: string;
  imgUrl: string;
  trackUrl: string;
}

const ModalUpdateTrack: React.FC<ModalUpdateTrackProps> = ({
  open,
  handleClose,
  track,
  fetchTracks,
}) => {
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();

  const [formData, setFormData] = React.useState<IFormData>({
    title: "",
    description: "",
    category: "",
    imgUrl: "",
    trackUrl: "",
  });

  React.useEffect(() => {
    if (track) {
      setFormData({
        title: track.title || "",
        description: track.description || "",
        category: track.category || "",
        imgUrl: track.imgUrl || "",
        trackUrl: track.trackUrl || "",
      });
    }
  }, [track]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateTrack = async () => {
    if (!track || !session?.access_token) {
      toast.error("Invalid track or session. Please try again.");
      return;
    }

    if (!formData.title || !formData.category || !formData.trackUrl) {
      toast.error(
        "Please fill in all required fields (Title, Category, Track URL)."
      );
      return;
    }

    try {
      setLoading(true);
      //@ts-ignore
      const res = await fetch(`${API_URL}/api/v1/tracks/${track.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          imgUrl: formData.imgUrl,
          trackUrl: formData.trackUrl,
        }),
      });

      if (res.status !== 200) {
        toast.error("Failed to update track.");
        return;
      }

      toast.success("Track updated successfully!");
      fetchTracks();
      handleClose();
      setFormData({
        title: "",
        description: "",
        category: "",
        imgUrl: "",
        trackUrl: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to update track. Please try again.");
      console.error("Update track error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseWithReset = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      imgUrl: "",
      trackUrl: "",
    });
    handleClose();
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
    },
  };

  return (
    <Dialog open={open} onClose={handleCloseWithReset} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Update Track
        <Button
          onClick={handleCloseWithReset}
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
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              disabled={loading}
              sx={inputStyles}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              disabled={loading}
              sx={inputStyles}
            />
            <FormControl fullWidth sx={inputStyles} disabled={loading}>
              <InputLabel id="category-select-label">Category *</InputLabel>
              <Select
                labelId="category-select-label"
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                label="Category *"
                required
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="WORKOUT">Workout</MenuItem>
                <MenuItem value="PARTY">Party</MenuItem>
                <MenuItem value="CHILL">Chill</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Image URL"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              disabled={loading}
              sx={inputStyles}
            />
            <TextField
              label="Track URL"
              name="trackUrl"
              value={formData.trackUrl}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              disabled={loading}
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
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseWithReset}
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTrack}
            disabled={loading || !track}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateTrack;
