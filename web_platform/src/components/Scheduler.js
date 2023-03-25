import React, { Component } from "react";
import Nav from "./NavBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Chip, Avatar } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { createMeeting, saveMeeting } from "../utils/apiCalls";

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      meetingSubject: "", // add a new stae variable for meeting subject
      emails: [],
      meetingDate: null, // add a new state variable for meeting date
      meetingTime: null, // add a new state variable for meeting time
      meetingCreated: false,
    };
  }

  handleChange = async (event) => {
    const { id, value } = event.target; // extract the id and value from the input field
    this.setState({ [id]: value }); // update the corresponding state variable based on the input field id
  };

  handleDateChange = async (date) => {
    this.setState({ meetingDate: date }); // update the meeting date state variable
  };

  handleTimeChange = async (time) => {
    this.setState({ meetingTime: time }); // update the meeting time state variable
  };

  handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      //Add the email to the list of emails
      this.setState((prevState) => ({
        emails: [...prevState.emails, prevState.value.trim()],
        value: "",
      }));
    }
  };

  handleDelete = async (index) => {
    this.setState((prevState) => {
      const newEmails = [...prevState.emails];
      newEmails.splice(index, 1);
      return { emails: newEmails };
    });
  };

  scheduleMeeting = async () => {
    console.log("Subject:", this.state.meetingSubject);
    console.log("attendee: ", this.state.emails);
    console.log("Date", this.state.meetingDate);
    console.log("Time:", this.state.meetingTime);
    let createMeetingResponse = await createMeeting(
      "shah8y@uwindsor.ca",
      "test",
      "123465413"
    );
    console.log("createMeetingResponse ", createMeetingResponse);

    let saveMeetingResponse = await saveMeeting(
      "shah8y@uwindsor.ca",
      "test",
      createMeetingResponse.join_url,
      createMeetingResponse.start_url,
      createMeetingResponse.id
    );
    if (saveMeetingResponse === "ok") {
      console.log("Saved in database");
      alert("Meeting Created");
      this.setState({
        meetingCreated: true,
      });
    } else {
      console.log("error while saving");
    }
  };

  render() {
    return (
      <>
        {this.state.meetingCreated ? (
          (window.location.href = "./home")
        ) : (
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
                    padding: 1,
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    sx={{ color: "gray" }}
                    variant="h5"
                  >
                    CREATE A MEETING
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      my: 3,
                      paddingLeft: 3,
                      paddingRight: 3,
                    }}
                  >
                    <Grid container spacing={1} sx={{ paddingTop: 1 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="meetingSubject" // update the id to match the state variable name
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
                          id="value" // update the id to match the state variable name
                          required
                          label="Attendee Email Address"
                          value={this.state.value}
                          onChange={this.handleChange}
                          onKeyPress={this.handleKeyPress}
                          type="text"
                          autoFocus
                        />
                        {this.state.emails.map((email, index) => (
                          <Chip
                            key={index}
                            label={email}
                            onDelete={() => this.handleDelete(index)}
                            avatar={<Avatar>{email[0]}</Avatar>}
                            style={{ margin: "4px" }}
                          />
                        ))}
                      </Grid>
                      <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DemoItem>
                              <DatePicker
                                label="Select a Date"
                                required
                                value={this.state.meetingDate} //add the value prop to display the selected date
                                onChange={this.handleDateChange} // add the onChange prop to update the state variable
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
                                value={this.state.meetingTime} // add the value prop to display the selected time
                                autoFocus
                                onChange={this.handleTimeChange} // add the onChange prop to update the state variable
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
                      onClick={this.scheduleMeeting}
                    >
                      Schedule a Meeting
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}

export default Scheduler;
