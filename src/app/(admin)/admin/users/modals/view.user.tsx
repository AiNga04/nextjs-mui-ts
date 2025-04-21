"use client";
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { IUser } from "@/types/next-auth";

interface ModalViewUserProps {
  open: boolean;
  handleClose: () => void;
  user?: IUser; // Optional, since the modal might open without a user initially
}

const ModalViewUser: React.FC<ModalViewUserProps> = ({
  open,
  handleClose,
  user,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        User Details
        <Button onClick={handleClose} color="secondary">
          <ClearIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        {user ? (
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
              value={user.id || "N/A"}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={user.name || "N/A"}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={user.username || "N/A"}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={user.email || "N/A"}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={user.address || "N/A"}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              value={user.role || "N/A"}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Gender"
              variant="outlined"
              fullWidth
              value={user.gender || "N/A"}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              value={user.age || "N/A"}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Created At"
              variant="outlined"
              fullWidth
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "N/A"
              }
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />

            <TextField
              label="Updated At"
              variant="outlined"
              fullWidth
              value={
                user.updatedAt
                  ? new Date(user.updatedAt).toLocaleString()
                  : "N/A"
              }
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                },
              }}
            />
          </Box>
        ) : (
          <Typography align="center" color="textSecondary">
            No user data available.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalViewUser;
