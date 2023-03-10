import React, { Component } from "react";
import Nav from "./NavBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { maxWidth } from "@mui/system";

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = async (event) => {};

  render() {
    return (
      <>
        <Nav />
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
            sx={{ padding: 1 }}
            item
            xs={8}
            sm={4}
            md={3}
            component={Paper}
            elevation={10}
            squares
          >
            <Box
              sx={{
                // border: "1px solid black",
                padding: 1,
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" sx={{ color: "gray" }} variant="h5">
                Create a Meeting
              </Typography>
              <Box
                component="form"
                sx={{
                  // border: "1px solid black",
                  my: 3,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}
              >
                <Grid container spacing={1} sx={{ paddingTop: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="title"
                      required
                      label="Meeting Subject"
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
                      label="Attendee Email Address"
                      type="email"
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DemoItem>
                          <DatePicker
                            label="Select a Date"
                            // sx={{
                            //   width: "22rem",
                            // }}
                            required
                            // defaultValue={dayjs("2022-04-17")}
                            onChange={this.handleChange}
                            autoFocus
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <DemoItem>
                          <TimePicker
                            disablePast
                            label="Pick a Time"
                            // sx={{
                            //   width: "22rem",
                            // }}
                            fullWidth
                            required
                            autoFocus
                            onChange={this.handleChange}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  sx={{ height: "3rem", marginTop: 3, marginBottom: 3 }}
                  variant="contained"
                >
                  Schedule a Meeting
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Scheduler;
