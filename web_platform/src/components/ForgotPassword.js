import React, { Component } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Avatar, InputAdornment, Link, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Copyright from "./Copyright";
import KeyIcon from "@mui/icons-material/Key";
import MailIcon from "@mui/icons-material/Mail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const theme = createTheme();

class PhoneVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isFormvalid: false,
    };
  }
  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Grid
            container
            component="main"
            sx={{
              height: "100vh",
              background: "linear-gradient(135deg, #c89abc 0%, #99c7a5 100%)",
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
                  my: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "#D69E6D" }}>
                  <KeyIcon />
                </Avatar>
                <Typography component="h1" variant="h6">
                  Forgot Password ?
                </Typography>
                <Typography
                  component="body1"
                  variant="span"
                  sx={{
                    color: "gray",
                    paddingTop: 1,
                  }}
                >
                  No worries. We will send you reset instructions.
                </Typography>

                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1, paddingLeft: 5, paddingRight: 5 }}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    type="email"
                    id="email"
                    required
                    label="Email"
                    name="otp"
                    placeholder="Email"
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    variant="contained"
                    // onClick={this.handleLogin}
                    disabled={!this.state.isFormvalid}
                  >
                    Reset Password
                  </Button>

                  <Grid container>
                    <Grid item xs sx={{ textAlign: "center" }}>
                      <Link underline="none" href="/login" variant="body2">
                        <Button
                          variant="text"
                          sx={{
                            bgcolor: "#F7F6F5",
                            color: "gray",
                            padding: 1,
                            marginBottom: 2,
                          }}
                        >
                          <ArrowBackIcon
                            sx={{ marginRight: 1, color: "gray" }}
                          />{" "}
                          Back to login
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 2 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    );
  }
}

export default PhoneVerification;
