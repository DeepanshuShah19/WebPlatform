import React, { Component } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { handleLogin } from "../utils/apiCalls";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "./Copyright";
const theme = createTheme();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isFormvalid: false,
      register: false,
    };
  }

  handleChange = async (event) => {
    this.setState(
      {
        [event.target.id]: [event.target.value],
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
  handleLogin = async () => {
    let loginResponse = await handleLogin(
      this.state.email,
      this.state.password
    );
    console.log("loginResponse", loginResponse);
  };

  render() {
    return (
      <>
        {this.state.register ? (
          (window.location.href = "./register")
        ) : (
          <>
            <ThemeProvider theme={theme}>
              <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage: "url(https://source.unsplash.com/random)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                      t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  component={Paper}
                  elevation={6}
                  square
                >
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
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
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        required
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={this.handleChange}
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

                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                      <Copyright sx={{ mt: 5 }} />
                    </Box>
                  </Box>

                  {/* <Grid className="form">
                    <Grid>
                      <TextField
                        id="email"
                        required
                        label="Email Id"
                        type="text"
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="password"
                        required
                        label="Password"
                        type="password"
                        onChange={this.handleChange}
                      />
                    </Grid>
                  </Grid> */}
                  {/* <Button
                    className="login__button"
                    variant="contained"
                    onClick={this.handleLogin}
                    disabled={!this.state.isFormvalid}
                  >
                    Sign In
                  </Button>

                  <Button
                    className="login__button"
                    variant="contained"
                    onClick={() => {
                      this.setState({ register: true });
                    }}
                  >
                    New User
                  </Button> */}
                </Grid>
              </Grid>
            </ThemeProvider>
          </>
        )}
      </>
    );
  }
}

export default Login;
