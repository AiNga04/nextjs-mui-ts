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
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../../components/loading/loading";

const SignInPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  // Form state
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  // Form validation errors
  const [formErrors, setFormErrors] = React.useState({
    username: "",
    password: "",
  });

  // Redirect if authenticated
  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { username: "", password: "" };

    if (!formData.username.trim()) {
      errors.username = "Username or email is required";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid username or password");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return status === "authenticated" ? (
    <Loading />
  ) : (
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
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            name="username"
            label="Email or Username"
            variant="outlined"
            fullWidth
            required
            value={formData.username}
            onChange={handleInputChange}
            error={!!formErrors.username}
            helperText={formErrors.username}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                />
              }
              label="Remember me"
              sx={{ color: "#666" }}
            />
            <Link
              href="/auth/forgot-password"
              underline="hover"
              sx={{ color: "#d81b60", fontWeight: "500" }}
            >
              Forgot Password?
            </Link>
          </Box>

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
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          <Divider sx={{ my: 2, color: "#888" }}>Or</Divider>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<GitHubIcon />}
            onClick={() => signIn("github", { callbackUrl: "/" })}
            sx={{
              py: 1.5,
              borderRadius: "10px",
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                borderColor: "#000",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                transform: "scale(1.02)",
                transition: "all 0.3s ease",
              },
            }}
          >
            Sign In with GitHub
          </Button>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            sx={{
              py: 1.5,
              borderRadius: "10px",
              color: "#DB4437",
              borderColor: "#DB4437",
              "&:hover": {
                borderColor: "#DB4437",
                backgroundColor: "rgba(219, 68, 55, 0.04)",
                transform: "scale(1.02)",
                transition: "all 0.3s ease",
              },
            }}
          >
            Sign In with Google
          </Button>

          <Typography
            align="center"
            sx={{ mt: 2, color: "#666", fontSize: "0.9rem" }}
          >
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              underline="hover"
              sx={{ color: "#d81b60", fontWeight: "500" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
