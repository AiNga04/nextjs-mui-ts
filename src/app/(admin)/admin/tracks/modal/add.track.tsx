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
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ModalAddTrackProps {
  open: boolean;
  handleClose: () => void;
  fetchTracks: () => void;
}

interface IFormData {
  title: string;
  description: string;
  category: string;
  imgUrl: string;
  trackUrl: string;
}

const ModalAddTrack: React.FC<ModalAddTrackProps> = ({
  open,
  handleClose,
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

  const handleAddTrack = async () => {
    if (!session?.access_token) {
      toast.error("Invalid session. Please try again.");
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
      const res = await await fetch(`${API_URL}/api/v1/tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.status !== 201) {
        toast.error("Failed to add track.");
        return;
      }

      toast.success("Track added successfully!");
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
      toast.error(error.message || "Failed to add track. Please try again.");
      console.error("Add track error:", error);
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
        Add New Track
        <Button
          onClick={handleCloseWithReset}
          color="secondary"
          aria-label="Close dialog"
        >
          <ClearIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: 2 }}
        >
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
        </Box>
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
            onClick={handleAddTrack}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddTrack;
