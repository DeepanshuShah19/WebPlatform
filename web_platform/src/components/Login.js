import React, { Component } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { handleLogin, handleGoogleLogin } from "../utils/apiCalls";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import Copyright from "./Copyright";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const theme = createTheme();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isFormvalid: false,
      register: false,
      loginSuccess: false,
    };
  }

  handleChange = async (event) => {
    this.setState(
      {
        [event.target.id]: event.target.value,
      },
      () => {
        this.handleFormValidation();
      }
    );
  };

  handleFormValidation = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isFormvalid: true });
    } else if (this.state.isFormvalid) {
      this.setState({ isFormvalid: false });
    }
  };

  handleLogin = async (e) => {
    e.preventDefault();

    let loginStatus = await handleLogin(this.state.email, this.state.password);
    if (loginStatus === "ok") {
      this.setState({ loginSuccess: true });
    }
  };

  handleSuccessfulGoogleLogin = async (response) => {
    // e.preventDefault();
    console.log(response);
    const userDetails = jwt_decode(response.credential);
    console.log(userDetails);
    let loginStatus = await handleGoogleLogin(userDetails);
    if (loginStatus === "ok") {
      this.setState({ loginSuccess: true });
    }
  };

  render() {
    return (
      <>
        {this.state.loginSuccess ? (
          (window.location.href = "./forgot-password")
        ) : (
          <>
            {this.state.register ? (
              (window.location.href = "./register")
            ) : (
              <>
                <ThemeProvider theme={theme}>
                  <Grid
                    container
                    component="main"
                    sx={{
                      height: "100vh",
                      background:
                        "linear-gradient(135deg, #c89abc 0%, #99c7a5 100%)",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: (t) =>
                        t.palette.mode === "light"
                          ? t.palette.grey[50]
                          : t.palette.grey[900],
                      backgroundSize: "cover",
                      backgroundPosition: "center",

                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CssBaseline />
                    <Grid
                      item
                      xs={8}
                      sm={4}
                      md={3}
                      component={Paper}
                      elevation={10}
                      square
                    >
                      <Box
                        sx={{
                          my: 6,
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
                        <Box
                          component="form"
                          noValidate
                          sx={{ mt: 1, paddingLeft: 5, paddingRight: 5 }}
                        >
                          <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            required
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            autoComplete="current-password"
                            id="password"
                            required
                            label="Password"
                            type="password"
                            onChange={this.handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PasswordIcon />
                                </InputAdornment>
                              ),
                            }}
                          />

                          <Button
                            type="submit"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                            variant="contained"
                            onClick={this.handleLogin}
                            disabled={!this.state.isFormvalid}
                          >
                            Sign In
                          </Button>

                          <Grid container sx={{ mb: 1 }}>
                            <Grid item xs>
                              <Link href="/forgot-password" variant="body2">
                                Forgot password?
                              </Link>
                            </Grid>
                            <Grid item>
                              {}
                              <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                              </Link>
                            </Grid>
                          </Grid>

                          <center>
                            <Typography
                              component="body1"
                              variant="span"
                              sx={{
                                color: "gray",
                              }}
                            >
                              OR
                            </Typography>
                            <Button fullWidth>
                              <GoogleOAuthProvider clientId="724670474306-rk0ssgl5i7ujn9af6lrt6s7vrbn4u86l.apps.googleusercontent.com">
                                <GoogleLogin
                                  theme="filled_blue"
                                  shape="rectangular"
                                  size="large"
                                  type="standard"
                                  width="300px"
                                  onSuccess={this.handleSuccessfulGoogleLogin}
                                  onError={() => {
                                    console.log("Google Login Failed");
                                  }}
                                />
                              </GoogleOAuthProvider>
                            </Button>
                          </center>
                          <Copyright sx={{ mt: 5, paddingTop: 2 }} />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </ThemeProvider>
              </>
            )}
          </>
        )}
      </>
    );
  }
}

export default Login;
