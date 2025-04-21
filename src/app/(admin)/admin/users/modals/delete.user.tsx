"use client";
import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { IUser } from "@/types/next-auth";

interface ModalDeleteUserProps {
  open: boolean;
  handleClose: () => void;
  user?: IUser; // Optional, since the modal might open without a user initially
  onDelete: (userId: string) => Promise<void>;
}

const ModalDeleteUser: React.FC<ModalDeleteUserProps> = ({
  open,
  handleClose,
  user,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!user?._id) return;

    setIsDeleting(true);
    try {
      await onDelete(user._id);
      handleClose(); // Close the modal on successful deletion
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Delete User
        <Button onClick={handleClose} color="secondary">
          <ClearIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Typography align="center" color="textSecondary" sx={{ mt: 2, mb: 3 }}>
          Are you sure you want to delete the user{" "}
          <strong>{user?.name || "Unknown"}</strong>? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          sx={{
            borderRadius: "10px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          variant="contained"
          color="error"
          disabled={isDeleting || !user?._id}
          sx={{
            borderRadius: "10px",
            bgcolor: "#d32f2f",
            "&:hover": {
              bgcolor: "#b71c1c",
            },
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDeleteUser;
