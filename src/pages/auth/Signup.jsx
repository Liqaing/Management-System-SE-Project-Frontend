// src/SignUpPage.js
import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LinkBtn from "../../components/ui/Link";
import axios from "axios";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !telephone || !password || !confirmPassword) {
      throw Error("Invalid input");
    }

    if (password != confirmPassword) {
      throw Error("Password is not same");
    }

    // handle sign-up logic here
    axios({
      method: "get",
      url: "/api", // This should be handled by your backend
    }).then(function (response) {
      console.log("axios", response);
      console.log(response.request);
      console.log(response.data);
    });

    axios
      .post("/api/auth/signup", {
        username: username,
        telephone: telephone,
        password: password,
      })
      .then((req) => {
        console.log(req);
      });
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            color="black"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="given-name"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="telephone"
            label="Telephone"
            name="telephone"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Stack direction="row" justifyContent="flex-end">
            <LinkBtn to="/auth/login" variant="body2">
              {"Already have an account? Login"}
            </LinkBtn>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
