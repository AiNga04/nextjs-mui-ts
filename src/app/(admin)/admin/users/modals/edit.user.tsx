"use client";
import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { IUser } from "@/types/next-auth";

interface ModalEditUserProps {
  open: boolean;
  handleClose: () => void;
  user?: IUser; // Optional, since the modal might open without a user initially
  onSubmit: (user: IUser) => Promise<void>;
}

const ModalEditUser: React.FC<ModalEditUserProps> = ({
  open,
  handleClose,
  user,
  onSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IUser | undefined>(user);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    role: "",
  });

  // Update form data when the user prop changes
  React.useEffect(() => {
    setFormData(user);
  }, [user]);

  // Validate a single field
  const validateField = (name: keyof IUser, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (/[!@#$%^&*(),.?":{}|<>';`]/.test(value))
          error =
            "Name cannot contain special characters like !, @, #, <, >, etc.";
        else if (!/^[a-zA-Z\s-]+$/.test(value))
          error = "Name can only contain letters, spaces, or hyphens";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        else if (/[!#$%^&*(),?":{}|<>';`]/.test(value))
          error =
            "Email cannot contain special characters like !, #, <, >, etc. (except @, ., -, _)";
        break;
      case "age":
        if (!value.trim()) error = "Age is required";
        else if (!/^\d+$/.test(value) || parseInt(value) <= 0)
          error = "Age must be a positive number";
        break;
      case "gender":
        if (!value.trim()) error = "Gender is required";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        else if (/[!@#$%^&*?":{}|<>';`]/.test(value))
          error =
            "Address cannot contain special characters like !, @, #, <, >, etc.";
        break;
      case "role":
        if (!value.trim()) error = "Role is required";
        break;
    }
    return error;
  };

  // Validate entire form
  const validateForm = () => {
    if (!formData) return false;

    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      age: validateField("age", formData.age.toString()),
      gender: validateField("gender", formData.gender),
      address: validateField("address", formData.address),
      role: validateField("role", formData.role),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "age" ? parseInt(value) || 0 : value,
          }
        : prev
    );
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Handle blur for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof IUser, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        gender: formData.gender.toUpperCase(), // Ensure gender matches API format (e.g., "MALE")
        role: formData.role.toUpperCase(), // Ensure role matches API format (e.g., "ADMIN")
      });
      handleClose(); // Close the modal on successful submission
    } catch (err) {
      console.error("Error updating user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Edit User
        <Button onClick={handleClose} color="secondary">
          <ClearIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        {formData ? (
          <Box
            component="form"
            onSubmit={handleSubmit}
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
              value={formData.id || "N/A"}
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
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={formData.name || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!formErrors.name}
              helperText={formErrors.name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            />

            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              value={formData.username || "N/A"}
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
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={formData.email || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!formErrors.email}
              helperText={formErrors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            />

            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              required
              value={formData.address || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!formErrors.address}
              helperText={formErrors.address}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            />

            <TextField
              name="role"
              label="Role"
              select
              variant="outlined"
              fullWidth
              required
              value={formData.role || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!formErrors.role}
              helperText={formErrors.role}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </TextField>

            <TextField
              name="gender"
              label="Gender"
              select
              variant="outlined"
              fullWidth
              required
              value={formData.gender || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!formErrors.gender}
              helperText={formErrors.gender}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </TextField>

            <TextField
              name="age"
              label="Age"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={formData.age || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!formErrors.age}
              helperText={formErrors.age}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            />

            <TextField
              label="Created At"
              variant="outlined"
              fullWidth
              value={
                formData.createdAt
                  ? new Date(formData.createdAt).toLocaleString()
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
                formData.updatedAt
                  ? new Date(formData.updatedAt).toLocaleString()
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

            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData}
              sx={{
                borderRadius: "10px",
                bgcolor: "#3f51b5",
                "&:hover": {
                  bgcolor: "#303f9f",
                },
              }}
            >
              {isSubmitting ? "Updating..." : "Update User"}
            </Button>
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

export default ModalEditUser;
