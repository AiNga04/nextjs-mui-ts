"use client";
import { IUser } from "@/types/next-auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ModalDeleteUserProps {
  open: boolean;
  handleClose: () => void;
  user?: IUser;
}

interface IBackendRes {
  status: number;
  message: string;
  data: any;
}

const DeleteUserModal: React.FC<ModalDeleteUserProps> = ({
  open,
  handleClose,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!user || !session?.access_token) {
      toast.error("Invalid user or session. Please try again.");
      return;
    }

    try {
      setLoading(true);
      const res = await sendRequest<IBackendRes>({
        //@ts-ignore
        url: `${API_URL}/api/v1/users/${user.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      toast.success(res.message || "User deleted successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
      console.error("Delete user error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Delete User
        <Button onClick={handleClose} color="secondary" disabled={loading}>
          <ClearIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete <strong>{user?.email}</strong>? This
          action cannot be undone.
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

export default DeleteUserModal;
