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
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

const SignInPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <Box
          component="form"
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

          <TextField
            name="username"
            label="Email or Username"
            variant="outlined"
            fullWidth
            required
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
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
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
              control={<Checkbox color="primary" />}
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
            variant="contained"
            size="large"
            fullWidth
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
            Sign In
          </Button>

          <Divider sx={{ my: 2, color: "#888" }}>Or</Divider>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<GitHubIcon />}
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
