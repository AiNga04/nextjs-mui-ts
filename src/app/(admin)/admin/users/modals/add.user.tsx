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
  SelectChangeEvent, // Import SelectChangeEvent
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ModalAddUserProps {
  open: boolean;
  handleClose: () => void;
}

interface IFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  role: string;
  gender: string;
  age: string;
}

const ModalAddUser: React.FC<ModalAddUserProps> = ({ open, handleClose }) => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update handleSelectChange to use SelectChangeEvent
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    if (!session?.access_token) {
      toast.error("Invalid user or session. Please try again.");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role ||
      !formData.gender ||
      !formData.age
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      toast.error("Age must be a valid positive number.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          role: formData.role,
          gender: formData.gender,
          age: Number(formData.age),
        }),
      });

      console.log("Response status:", res);

      if (res.status !== 201) {
        toast.error("Failed to add user.");
        return;
      }

      toast.success("User added successfully!");
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
      toast.error(error.message || "Failed to add user. Please try again.");
      console.error("Add user error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Add New User
        <Button onClick={handleClose} color="secondary">
          <ClearIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            mt: 2,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            type="email"
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
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            type="password"
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
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            type="password"
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
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
              },
            }}
          />

          <FormControl
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          >
            <InputLabel id="role-select-label">Role *</InputLabel>
            <Select
              labelId="role-select-label"
              name="role"
              value={formData.role}
              onChange={handleSelectChange}
              label="Role *"
              required
              sx={{
                borderRadius: "10px",
              }}
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="USER">User</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          >
            <InputLabel id="gender-select-label">Gender *</InputLabel>
            <Select
              labelId="gender-select-label"
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
              label="Gender *"
              required
              sx={{
                borderRadius: "10px",
              }}
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

        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddUser;
