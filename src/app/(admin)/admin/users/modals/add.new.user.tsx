"use client";
import * as React from "react";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IUser } from "@/types/next-auth";

interface ModalAddNewUserProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: IUser) => Promise<void>;
}

const ModalAddNewUser: React.FC<ModalAddNewUserProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IUser | any>({
    name: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
    address: "",
    role: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    address: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        else if (!/[!@#$%^&*(),.?":{}|]/.test(value))
          error =
            'Password must contain at least one special character (!@#$%^&*(),.?":{}|)';
        else if (/[<>'`;]/.test(value))
          error =
            "Password cannot contain <, >, ', \", ;, or ` to prevent hacking";
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
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
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
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
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

  // Handle password visibility toggle
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        gender: formData.gender.toUpperCase(), // Ensure gender matches API format (e.g., "MALE")
        role: formData.role.toUpperCase(), // Ensure role matches API format (e.g., "ADMIN")
      });
      onClose(); // Close the modal on successful submission
    } catch (err) {
      console.error("Error adding user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Add New User
        <Button onClick={onClose} color="secondary">
          <ClearIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
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
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={formData.name}
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
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
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

          <FormControl
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
            variant="outlined"
            error={!!formErrors.password}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password *"
            />
            {formErrors.password && (
              <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                {formErrors.password}
              </Typography>
            )}
          </FormControl>

          <TextField
            name="age"
            label="Age"
            type="number"
            variant="outlined"
            fullWidth
            required
            value={formData.age}
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
            name="gender"
            label="Gender"
            select
            variant="outlined"
            fullWidth
            required
            value={formData.gender}
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
            name="address"
            label="Address"
            variant="outlined"
            fullWidth
            required
            value={formData.address}
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
            value={formData.role}
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
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{
              width: "100%",
              borderRadius: "10px",
              bgcolor: "#3672b5",
              "&:hover": {
                bgcolor: "#354f9f",
              },
            }}
          >
            {isSubmitting ? "Adding..." : "Add User"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddNewUser;
