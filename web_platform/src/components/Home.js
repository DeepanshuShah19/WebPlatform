import React, { Component } from "react";
import NavBar from "./NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Link, Typography } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";

const theme = createTheme();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <nav>
          <NavBar />
        </nav>
        <main>
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
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <CssBaseline />
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={4}
                  sx={{
                    borderRadius: 3,
                  }}
                  component={Paper}
                  elevation={5}
                  // square
                >
                  <Box
                    sx={{
                      my: 6,

                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <MeetingRoomIcon />
                    </Avatar>
                    <Typography
                      component="body1"
                      variant="span"
                      align="justify"
                      sx={{
                        color: "gray",
                        paddingTop: 2,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      Click Your Meeting button to see you all scheduled meeting.
                    </Typography>

                    <Link
                      underline="none"
                      href="/scheduled-meetings"
                      varient="body2"
                    >
                      <Button
                        sx={{
                          marginTop: 3,
                          height: "3rem",
                        }}
                        variant="contained"
                      >
                        Your Meeting
                      </Button>
                    </Link>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={4}
                  component={Paper}
                  elevation={10}
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  <Box
                    sx={{
                      my: 6,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <EventNoteIcon />
                    </Avatar>
                    <Typography
                      component="body1"
                      variant="span"
                      align="justify"
                      sx={{
                        color: "gray",
                        paddingTop: 2,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      Click Schedule meeting button to schedule a new zoom meeting.
                    </Typography>

                    <Link href="/scheduler" underline="None" variant="body2">
                      <Button
                        sx={{
                          marginTop: 3,
                          height: "3rem",
                        }}
                        variant="contained"
                      >
                        Schedule a Meeting
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </ThemeProvider>
          </>
        </main>
      </div>
    );
  }
}

export default Home;
