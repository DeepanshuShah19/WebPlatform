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
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PhoneInput from "react-phone-input-2";
// import WebhookIcon from "@mui/icons-material/Webhook";
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
    if (
      this.state.email &&
      this.state.password === this.state.confirmPassword &&
      this.state.name &&
      this.state.phone &&
      this.state.country &&
      this.state.street &&
      this.state.province &&
      this.state.postalCode
    ) {
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
    console.log("loginResponse", registrationResponse);
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   console.log(phone);

  //   if (password1 !== password2) return alert("Password didn't match");

  //   try {
  //     console.log("Sending Request.....");
  //     let resp = await fetch("http://localhost:5000/register", {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({
  //         name: name,
  //         password: password1,
  //         email: email,
  //         phone: phone,
  //         country: country,
  //         street: street,
  //         province: province,
  //         postalCode: postalCode,
  //       }),
  //     });
  //     if (resp.status === 200) {
  //       alert("User Registered Successfully");
  //     } else if (resp.status === 409) {
  //       alert("User Already Exists");
  //     } else {
  //       alert("User Registration Unsuccessfull");
  //     }
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };
  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Grid
            container
            component="main"
            sx={{
              height: "105vh",
              // backgroundImage: "url(https://source.unsplash.com/random)",
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
              xs={12}
              sm={8}
              md={4}
              component={Paper}
              elevation={10}
              square
            >
              <Box
                sx={{
                  marginTop: 5,
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

                <Box component="form" sx={{ mt: 3, padding: 3 }}>
                  <Grid container spacing={2}>
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
                        country="ca"
                        required
                        label="Phone Number"
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="street"
                        required
                        label="Street name"
                        type="text"
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="province"
                        required
                        label="Province"
                        type="text"
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {" "}
                      <TextField
                        fullWidth
                        id="postalCode"
                        required
                        label="Postal Code"
                        type="text"
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="country"
                        required
                        label="Country"
                        type="text"
                        onChange={this.handleChange}
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="termsAndCondition" color="primary" />
                        }
                        label="I agree to the following terms and Condition"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
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
                </Box>
                <Copyright sx={{ mt: 5, mb: 5 }} />
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    );
  }
}

export default Register;
