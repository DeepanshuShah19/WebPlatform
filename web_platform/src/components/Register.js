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
import app from "./FireBaseConfig";
import "react-phone-input-2/lib/bootstrap.css";
import { handleRegistration } from "../utils/apiCalls";
import Copyright from "./Copyright";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import Swal from "sweetalert2";

const theme = createTheme();
const auth = getAuth(app);

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
      code: "",
      otp: "",
      isFormvalid: false,
      acceptedTerms: false,
      registrationSuccess: false,
      verifyButton: false,
      verifyOtp: false,
      verified: false,
    };
    this.handleRegistration = this.handleRegistration.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  handleChange = async (event) => {
    if (event.target.id === "acceptedTerms") {
      this.setState(
        {
          [event.target.id]: event.target.checked,
        },
        () => {
          this.handleFormValidation();
        }
      );
    } else {
      this.setState(
        {
          [event.target.id]: event.target.value,
        },
        () => {
          this.handleFormValidation();
        }
      );
    }
  };

  handlePhoneNumberChange = async (e) => {
    this.setState({ phone: e.target.value }, function () {
      if (this.state.phone.length === 10 && this.state.code) {
        this.setState({ verifyButton: true });
      }
    });
  };

  handleFormValidation = async () => {
    if (
      this.state.email &&
      this.state.password === this.state.confirmPassword &&
      this.state.name &&
      this.state.phone.length === 10 &&
      this.state.acceptedTerms === true &&
      this.state.code &&
      this.state.verified
    ) {
      this.setState({ isFormvalid: true });
    } else if (this.state.isFormvalid) {
      this.setState({ isFormvalid: false });
    }
  };

  handleRegistration = async (e) => {
    e.preventDefault();

    let registartionResponse = await handleRegistration(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.phone
    );
    if (registartionResponse === "ok") {
      Swal.fire({
        icon: "success",
        title: "Registration Successfull!",
        text: "You have successfully register...",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => this.setState({ registrationSuccess: true }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Registration Unsuccessfull!",
        text: { registartionResponse },
      });
    }
  };

  onCaptchaVerify = (async) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          this.onSignInSubmit();
        },
      },
      auth
    );
  };

  onSignInSubmit = (async) => {
    this.onCaptchaVerify();
    const phoneNumber = "+" + this.state.code + this.state.phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        Swal.fire({
          icon: "success",
          title: "OTP Sended!",
          text: "Check your phone for otp...",
          showConfirmButton: false,
          timer: 2000,
        });
        // alert("OTP sended");
        this.setState({ verifyOtp: true });
      })
      .catch((error) => {});
  };

  verifyCode = (async) => {
    window.confirmationResult
      .confirm(this.state.otp)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Verification Successfull!",
          text: "Code has been Verified...",
          showConfirmButton: false,
          timer: 2000,
        });
        // alert("Verification Successful");
        this.setState({
          verified: true,
          verifyOtp: false,
          verifyButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP",
          text: "Please type correct OTP...",
        });
        // alert("Invalid OTP");
      });
  };

  render() {
    return (
      <>
        {this.state.registrationSuccess ? (
          (window.location.href = "./login")
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
                      <Grid id="recaptcha-container"></Grid>
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            id="code"
                            required
                            label="Code"
                            type="tel"
                            onChange={this.handleChange}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            fullWidth
                            id="phone"
                            type="tel"
                            required
                            label="Phone Number"
                            onChange={this.handlePhoneNumberChange}
                            autoFocus
                          />
                        </Grid>

                        {this.state.verifyButton ? (
                          <Button
                            // type="submit"
                            fullWidth
                            sx={{ mt: 2, mb: 2 }}
                            variant="contained"
                            onClick={this.onSignInSubmit}
                          >
                            Verify Phone Number
                          </Button>
                        ) : null}
                        {this.state.verifyOtp ? (
                          <>
                            <Grid item xs={12} sm={9}>
                              <TextField
                                fullWidth
                                id="otp"
                                type="tel"
                                required
                                label="OTP"
                                onChange={this.handleChange}
                                autoFocus
                              />
                            </Grid>
                            <Button
                              // type="submit"
                              fullWidth
                              sx={{ mt: 2, mb: 2 }}
                              variant="contained"
                              onClick={this.verifyCode}
                            >
                              Verify OTP
                            </Button>
                          </>
                        ) : null}
                        {/* <Grid item xs={12} sm={6}>
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
                      </Grid> */}
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
                              <Checkbox
                                onChange={this.handleChange}
                                name="acceptedTerms"
                                id="acceptedTerms"
                                color="primary"
                              />
                            }
                            label="I agree to the following terms and Condition"
                          />
                        </Grid>
                      </Grid>
                      <Button
                        // type="submit"
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
        )}
      </>
    );
  }
}

export default Register;
