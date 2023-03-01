import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

// import "../styles/Register.css";
import "react-phone-input-2/lib/bootstrap.css";
import { handleRegistration } from "../utils/apiCalls";
import Copyright from "./Copyright";

const theme = createTheme();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      country: "",
      street: "",
      province: "",
      postalCode: "",
      isFormvalid: false,
      acceptedTerms: false
    };
  }

  handleChange = async (event) => {
    if (event.target.id === 'acceptedTerms') {
      this.setState({
        [event.target.id]: event.target.checked,
      }, () => {
        this.handleFormValidation();
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value,
      }, () => {
        this.handleFormValidation();
      });
    }
  };

  handleFormValidation = async () => {
    // debugger
    if ( this.state.email && (this.state.password === this.state.confirmPassword) && this.state.name && this.state.phone && this.state.country &&
      this.state.street && this.state.province && this.state.postalCode && this.state.acceptedTerms === true) {
      this.setState({ isFormvalid: true });
    } else if (this.state.isFormvalid) {
      this.setState({ isFormvalid: false });
    }
  };

  handleRegistration = async () => {
    let registrationResponse = await handleRegistration(
      this.state.email,
      this.state.password
    );
    console.log("registration response", registrationResponse);
  };

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
              flexDirection: "column",
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
                  marginTop: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>

                <Box
                  component="form"
                  sx={{ my: 3, paddingLeft: 3, paddingRight: 3 }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="name"
                        required
                        label="Name"
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="email"
                        required
                        label="Email Address"
                        type="email"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="phone"
                        type="tel"
                        label="Phone Number"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="street"
                        label="Street name"
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="province"
                        label="Province"
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {" "}
                      <TextField
                        fullWidth
                        id="postalCode"
                        label="Postal Code"
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="country"
                        label="Country"
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        required
                        label="Password"
                        type="password"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="confirmPassword"
                        required
                        label="Confirm Password"
                        type="password"
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox onChange={this.handleChange} name="acceptedTerms" id="acceptedTerms" color="primary" />
                        }
                        label="I agree to the following terms and Condition"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                    variant="contained"
                    onClick={this.handleRegistration}
                    disabled={!this.state.isFormvalid}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ paddingTop: 2 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    );
  }
}

export default Register;
