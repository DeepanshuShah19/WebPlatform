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
import CodeIcon from "@mui/icons-material/Code";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
const theme = createTheme();

class PhoneVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <OfflinePinIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Account Verification
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1, paddingLeft: 5, paddingRight: 5 }}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    id="otp"
                    required
                    label="OTP Verification"
                    name="otp"
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CodeIcon />
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
                    Verify Account
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Didn't recieve a code ? Try Again.
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 6 }} />
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
