import React, { Component } from "react";
import { Grid, TextField, Button } from '@material-ui/core';
// import WebhookIcon from "@mui/icons-material/Webhook";
import "../styles/Register.css";
import "react-phone-input-2/lib/bootstrap.css";
import { handleRegistration } from '../utils/apiCalls';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            country: '',
            street: '',
            province: '',
            postalCode: '',
            isFormvalid: false
        }
    }

    handleChange = async (event) => {
        this.setState({
            [event.target.id]: [event.target.value]
        }, () => {
            this.handleFormValidation();
        })
    };

    handleFormValidation = async () => {
        if (this.state.email && (this.state.password === this.state.confirmPassword) && this.state.name && this.state.phone
            && this.state.country && this.state.street && this.state.province && this.state.postalCode) {
            this.setState({ isFormvalid: true })
        } else if (this.state.isFormvalid) {
            this.setState({ isFormvalid: false })
        }
    }

    handleRegistration = async () => {
        let registrationResponse = await handleRegistration(this.state.email, this.state.password);
        console.log("loginResponse", registrationResponse);
    }

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
            <Grid className="app__register">
                <Grid className="register_container">
                    <Grid className="container_left">
                        <Grid className="form">
                            <Grid>
                                <TextField id="name" required label="Name" type="text" onChange={this.handleChange} />
                            </Grid>
                            <Grid>
                                <TextField id="email" required label="Email Id" type="text" onChange={this.handleChange} />
                            </Grid>
                            <Grid>
                                <TextField id="phone" required label="Phone Number" type="text" onChange={this.handleChange} />
                            </Grid>
                            <Grid>
                                <TextField id="street" required label="Street name" type="text" onChange={this.handleChange} />
                            </Grid>
                            <Grid>
                                <TextField id="province" required label="Provience" type="text" onChange={this.handleChange} />
                            </Grid>
                            <Grid>
                                <TextField id="postalCode" required label="Postal Code" type="text" onChange={this.handleChange} />
                            </Grid>
                            <Grid>
                                <TextField id="country" required label="Country" type="text" onChange={this.handleChange} />
                            </Grid>
                            <Grid>
                                <TextField id="password" required label="Password" type="password" onChange={this.handleChange} />
                            </Grid>
                            <Grid>
                                <TextField id="confirmPassword" required label="Confirm Password" type="password" onChange={this.handleChange} />
                            </Grid>
                        </Grid>
                        <Button className="login__button" variant="contained" onClick={this.handleRegistration} disabled={!this.state.isFormvalid}>
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
};

export default Register;
