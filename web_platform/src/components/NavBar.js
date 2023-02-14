import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Box, Stack, Button } from "@mui/material";
import WebhookIcon from "@mui/icons-material/Webhook";
import { BrowserRouter as useNavigate, Link } from "react-router-dom";

const NavBar = () => {
    let navigate = useNavigate();

    const navToLoginPage = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    const navToRegisterPage = (e) => {
        e.preventDefault();
        navigate("/register");
    };
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            translateY={0}
            transitionProperty="transform"
            transitionDuration=".3s"
            transitionTimingFunction="ease-in-out"
            backgroundColor="#18181b"
        >
            <Box color="white" maxWidth="1280px" margin="0 auto">
                <Stack
                    direction="row"
                    spacing={2}
                    px={2}
                    py={2}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <nav>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <WebhookIcon />
                            <p> Web Platform </p>
                        </Stack>
                    </nav>
                    <nav>
                        <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="space-between"
                            alignItems="center"
                        >

                            <Button
                                style={{
                                    borderRadius: 6,
                                    color: "white",
                                    fontSize: "1rem",
                                }}
                                variant="outlined"
                                className="nav_button__login"
                                onClick={navToLoginPage}
                            >
                                {" "}
                                Login
                            </Button>


                            <Button
                                style={{
                                    borderRadius: 6,
                                    fontSize: "1rem",
                                }}
                                variant="contained"
                                className="nav_button__register"
                                onClick={navToRegisterPage}
                            >
                                Register
                            </Button>

                        </Stack>
                    </nav>
                </Stack>
            </Box>
        </Box>
    );
};

export default NavBar;