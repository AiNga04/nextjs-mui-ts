"use client";
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { sendRequest } from "@/utils/api";
import { ITracks } from "@/types/next-auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ModalDeleteTrackProps {
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

const ModalDeleteTrack: React.FC<ModalDeleteTrackProps> = ({
  open,
  handleClose,
  track,
  fetchTracks,
}) => {
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!track || !session?.access_token) {
      toast.error("Invalid track or session. Please try again.");
      return;
    }

    try {
      setLoading(true);
      const res = await sendRequest<IBackendRes>({
        // @ts-ignore
        url: `${API_URL}/api/v1/tracks/${track.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (res.status !== 200) {
        toast.error(res.message || "Failed to delete track.");
        return;
      }

      toast.success(res.message || "Track deleted successfully!");
      fetchTracks();
      handleClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete track. Please try again.");
      console.error("Delete track error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the track{" "}
          <strong>{track?.title || "Unknown"}</strong>?This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDeleteTrack;
