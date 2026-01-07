"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Container,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import gsap from "gsap";
import { colors } from "../../theme/colors";
import { PrimaryButton } from "../../components/CustomButtons";
import { useRouter } from "next/navigation";
import { useToast } from "../../components/ToastProvider";

// Create a custom theme based on the requirements
const theme = createTheme({
  palette: {
    text: {
      primary: colors.text,
    },
    background: {
      default: colors.background,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: colors.text,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: colors.accent2, // Fill the color
            borderRadius: "12px", // Rounded elbows
            "& fieldset": {
              border: "none", // No line border
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
            "&.Mui-focused": {
              backgroundColor: "#e0e2e5", // Slightly darker on focus maybe? Or keep it same.
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.text, // Text color for labels
            opacity: 0.7,
            "&.Mui-focused": {
              color: colors.text,
              opacity: 1,
            },
          },
        },
      },
    },
  },
});

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { success, error } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // GSAP Entry Animation
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
      });

      gsap.from(".login-element", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Handle success (e.g., save token, redirect)
        console.log("Login successful:", data);
        success("Login Successful!");
        // Example: router.push('/dashboard');
      } else {
        error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <Container maxWidth="sm" ref={containerRef}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "16px",
              border: `1px solid ${colors.secondary}`,
              backgroundColor: "#ffffff", // Use white or accent1
              boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }} className="login-element">
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.text }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: colors.text, opacity: 0.7, mt: 1 }}
              >
                Please login to continue
              </Typography>
            </Box>

            <form ref={formRef} onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }} className="login-element">
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box sx={{ mb: 4 }} className="login-element">
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                className="login-element"
              >
                <PrimaryButton
                  label={loading ? "Logging in..." : "Login Securely"}
                  type="submit"
                  fullWidth
                  disabled={loading}
                />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
