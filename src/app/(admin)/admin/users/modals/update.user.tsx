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
import { IUser } from "@/types/next-auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ModalUpdateUserProps {
  open: boolean;
  handleClose: () => void;
  user?: IUser;
}

interface IBackendRes {
  status: number;
  message: string;
  data: any;
}

type Role = "ADMIN" | "USER";
type Gender = "MALE" | "FEMALE";

interface IFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  role: Role | "";
  gender: Gender | "";
  age: string;
}

const ModalUpdateUser: React.FC<ModalUpdateUserProps> = ({
  open,
  handleClose,
  user,
}) => {
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();

  const [formData, setFormData] = React.useState<IFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "",
    gender: "",
    age: "",
  });

  // Initialize form data when user prop changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        address: user.address || "",
        role: (user.role as Role) || "",
        gender: (user.gender as Gender) || "",
        age: user.age ? String(user.age) : "",
      });
    }
  }, [user]);

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

  const handleUpdateUser = async () => {
    if (!user || !session?.access_token) {
      toast.error("Invalid user or session. Please try again.");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.gender ||
      !formData.age
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.password && formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      toast.error("Age must be a valid positive number.");
      return;
    }

    try {
      setLoading(true);
      const payload: Partial<IFormData> = {
        //@ts-ignore
        _id: user.id,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        role: formData.role,
        gender: formData.gender,
        age: formData.age,
      };

      // Only include password if provided
      if (formData.password) {
        payload.password = formData.password;
      }

      const res = await fetch(`${API_URL}/api/v1/users`, {
        method: "PATCH", // Use PATCH or PUT depending on your API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status !== 200) {
        toast.error("Failed to update user.");
        return;
      }

      toast.success("User updated successfully!");
      handleClose();
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        role: "",
        gender: "",
        age: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to update user. Please try again.");
      console.error("Update user error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseWithReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      role: "",
      gender: "",
      age: "",
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
        Update User
        <Button
          onClick={handleCloseWithReset}
          color="secondary"
          aria-label="Close dialog"
        >
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
              sx={inputStyles}
            />

            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              disabled={loading}
              sx={inputStyles}
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              type="email"
              disabled={loading}
              sx={inputStyles}
            />

            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="password"
              disabled={loading}
              sx={inputStyles}
              helperText="Leave blank to keep the current password"
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="password"
              disabled={loading}
              sx={inputStyles}
            />

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              disabled={loading}
              sx={inputStyles}
            />

            <FormControl fullWidth sx={inputStyles} disabled={loading}>
              <InputLabel id="role-select-label">Role *</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={formData.role}
                onChange={handleSelectChange}
                label="Role *"
                required
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="USER">User</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={inputStyles} disabled={loading}>
              <InputLabel id="gender-select-label">Gender *</InputLabel>
              <Select
                labelId="gender-select-label"
                name="gender"
                value={formData.gender}
                onChange={handleSelectChange}
                label="Gender *"
                required
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              type="number"
              disabled={loading}
              sx={inputStyles}
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
              sx={inputStyles}
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
              sx={inputStyles}
            />
          </Box>
        ) : (
          <Typography align="center" color="textSecondary">
            No user data available.
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
            onClick={handleUpdateUser}
            disabled={loading || !user}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateUser;
