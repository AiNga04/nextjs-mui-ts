"use client";
import * as React from "react";
import "@/assets/styles/app.scss";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
  Alert,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
import { JWT } from "next-auth/jwt/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SignUpPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    address: "",
  });

  // Form validation errors
  const [formErrors, setFormErrors] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    address: "",
  });

  // Validate a single field
  const validateField = React.useCallback(
    (name: keyof typeof formData, value: string) => {
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
        case "confirmPassword":
          if (!value) error = "Confirm Password is required";
          else if (value !== formData.password)
            error = "Passwords do not match";
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
      }
      return error;
    },
    [formData.password]
  );

  // Validate entire form
  const validateForm = React.useCallback(() => {
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
      age: validateField("age", formData.age),
      gender: validateField("gender", formData.gender),
      address: validateField("address", formData.address),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  }, [formData, validateField]);

  // Handle input change
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear error for the field
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    },
    []
  );

  // Handle blur for validation
  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const error = validateField(name as keyof typeof formData, value);
      setFormErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField]
  );

  // Handle password visibility toggle
  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleClickShowConfirmPassword = React.useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleMouseDownPassword = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleMouseUpPassword = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  // Handle form submission
  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      setError("");
      setSuccess("");

      try {
        const res = await sendRequest<IBackendRes<JWT>>({
          url: `${API_URL}/api/v1/auth/register`,
          method: "POST",
          body: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            age: parseInt(formData.age),
            gender: formData.gender,
            address: formData.address,
          },
        });

        if (res.error) {
          setError(res.message || "Registration failed. Please try again.");
        } else {
          setSuccess("Registration successful! Redirecting to sign-in...");
          setTimeout(() => {
            router.push("/auth/signin");
          }, 2000);
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, router]
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)",
        padding: "20px",
      }}
    >
      <Grid
        size={{ xs: 12, sm: 8, md: 6, lg: 4 }}
        sx={{
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight="500"
            sx={{
              color: "#1a237e",
              letterSpacing: "1px",
              mb: 1,
            }}
          >
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

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
            error={!!formErrors.confirmPassword}
          >
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword
                        ? "hide the confirm password"
                        : "display the confirm password"
                    }
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password *"
            />
            {formErrors.confirmPassword && (
              <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                {formErrors.confirmPassword}
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
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{
              py: 1.5,
              borderRadius: "10px",
              bgcolor: "#3f51b5",
              "&:hover": {
                bgcolor: "#303f9f",
                transform: "scale(1.02)",
                transition: "all 0.3s ease",
              },
            }}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>

          <Divider sx={{ my: 2, color: "#888" }}>Or</Divider>

          <Typography
            align="center"
            sx={{ mt: 2, color: "#666", fontSize: "0.9rem" }}
          >
            Already have an account?{" "}
            <Button
              href="/auth/signin"
              sx={{
                color: "#d81b60",
                fontWeight: "500",
                textTransform: "none",
              }}
            >
              Sign In
            </Button>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
