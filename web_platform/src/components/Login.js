import React, { Component } from "react";
import { Grid, TextField, Button } from '@material-ui/core';
import "../styles/Login.css";
import { handleLogin } from '../utils/apiCalls';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isFormvalid: false,
            register: false
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
        if (this.state.email && this.state.password) {
            this.setState({ isFormvalid: true })
        } else if (this.state.isFormvalid) {
            this.setState({ isFormvalid: false })
        }
    }
    handleLogin = async () => {
        let loginResponse = await handleLogin(this.state.email, this.state.password);
        console.log("loginResponse", loginResponse);
    }
    render() {
        return (
            <>
                {this.state.register
                    ? window.location.href = "./register"
                    : <><Grid className="app__login">
                        <Grid className="login__container">
                            <Grid className="container_right">
                                <Grid className="form">
                                    <Grid>
                                        <TextField id="email" required label="Email Id" type="text" onChange={this.handleChange} />
                                    </Grid>
                                    <Grid>
                                        <TextField id="password" required label="Password" type="password" onChange={this.handleChange} />
                                    </Grid>
                                </Grid>
                                <Button className="login__button" variant="contained" onClick={this.handleLogin} disabled={!this.state.isFormvalid}>
                                    Sign In
                                </Button>

                                <Button className="login__button" variant="contained" onClick={() => { this.setState({ register: true }) }}>
                                    New User
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid></>}
            </>
        );
    }
};

export default Login;
