import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LinkBtn from "../../components/ui/Link";
import axios from "axios";
import ErrorAlert from "../../components/ui/Alert";

const LoginPage = () => {
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear the previous error before making a new request
    setError(null);

    try {
      const response = await axios.post("/api/auth/login", {
        telephone: telephone,
        password: password,
      });
      console.log(response);
    } catch (err) {
      // Handle error and set the error message
      setError({
        title: "Login Failed",
        msg:
          err.response?.data?.error.message ||
          "An error occurred during login.",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="telephone"
            label="Telephone"
            name="telephone"
            autoFocus
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <LinkBtn to="/auth/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </LinkBtn>
        </Box>
      </Box>

      {/* Render ErrorAlert only if an error exists */}
      {error && <ErrorAlert title={error.title} msg={error.msg} />}
    </Container>
  );
};

export default LoginPage;
