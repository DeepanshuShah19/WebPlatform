import React, { Component } from "react";

import { Box, Stack, Button, Link } from "@mui/material";
import WebhookIcon from "@mui/icons-material/Webhook";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem("userEmailId"),
    };
  }

  navToLoginPage = (e) => {
    e.preventDefault();
  };

  navToRegisterPage = (e) => {
    e.preventDefault();
  };

  signOut = async () => {
    localStorage.removeItem("userEmailId");
    window.location.href = "./login";
  };

  render() {
    return (
      <Box
        position="absolute"
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
              <Link
                underline="none"
                href="./home"
                varient="body2"
                sx={{
                  color: "white",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <WebhookIcon />
                  <p> Web Platform </p>
                </Stack>
              </Link>
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
                  onClick={this.signOut}
                >
                  <LogoutIcon
                    style={{
                      marginRight: "0.5rem",
                    }}
                  />{" "}
                  Sign Out
                </Button>

                {/* <Link underline="none" href="/profile" varient="body2">
                  <Button
                    style={{
                      borderRadius: 6,
                      fontSize: "1rem",
                    }}
                    variant="contained"
                    className="nav_button__register"
                  >
                    <AccountCircleIcon
                      style={{
                        marginRight: "0.5rem",
                      }}
                    />
                    {this.state.user}
                  </Button>
                </Link> */}
                <AccountCircleIcon
                  style={{
                    marginRight: "0.5rem",
                  }}
                />
                {this.state.user}
              </Stack>
            </nav>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default NavBar;
