import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
} from "@mui/material";

const SignUpPage = () => {
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
            Sign Up
          </Typography>

          <TextField
            name="username"
            label="Username"
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
            name="email"
            label="Email"
            type="email"
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
            Sign Up
          </Button>

          <Divider sx={{ my: 2, color: "#888" }}>Or</Divider>

          <Typography
            align="center"
            sx={{ mt: 2, color: "#666", fontSize: "0.9rem" }}
          >
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              underline="hover"
              sx={{ color: "#d81b60", fontWeight: "500" }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
