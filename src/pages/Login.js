import React, { useState } from "react";
import axios from "../api/axios";
import { saveToken } from "../utils";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
} from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/qclogin", { email, password });
      if (res.status === 200 && res.data.access_token) {
        saveToken(res.data.access_token);
        navigate("/dashboard");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check credentials or try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 20, borderRadius: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          gutterBottom
        >
          Sign in
        </Typography>

        {/* <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
          Don&apos;t have an account?{" "}
          <Link href="#" color="error" underline="none" fontWeight="600">
            Get started
          </Link>
        </Typography> */}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="Email address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            placeholder="6+ characters"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* <Box textAlign="right" mb={2}>
            <Link href="#" variant="body2" underline="hover">
              Forgot password?
            </Link>
          </Box> */}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#0F1114",
              color: "#fff",
              textTransform: "none",
              borderRadius: 2,
              mt:3
            }}
          >
            Sign in
          </Button>
        </Box>

        {/* <Divider sx={{ my: 3, fontSize: "14px" }}>or continue with</Divider> */}

        {/* <Box display="flex" justifyContent="center" gap={2}>
          <IconButton>
            <FaGoogle size={20} />
          </IconButton>
          <IconButton>
            <FaGithub size={20} />
          </IconButton>
          <IconButton>
            <FaXTwitter size={20} />
          </IconButton>
        </Box> */}
      </Paper>
    </Container>
  );
};

export default Login;
