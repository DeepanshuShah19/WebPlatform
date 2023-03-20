import React, { Component } from "react";
import Nav from "./NavBar";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Grid,
  CssBaseline,
  Paper,
  Box,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";
import Button from "@mui/material/Button";
import { getUserMeetings, deleteMeeting } from "../utils/apiCalls";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          title: "Meeting 1",
          link: "https://us02web.zoom.us/j/83377978843?pwd=NUg0UHlNM1Y0akoxWkFHOXhpWlk2dz09#success",
          date: "March 1, 2023",
          attendee: ["apple@gmail.com", "banana@gmail.com"],
          time: "12:00 PM",
        },
        {
          title: "Meeting 2",
          link: "https://us02web.zoom.us/j/83377978843?pwd=NUg0UHlNM1Y0akoxWkFHOXhpWlk2dz09#success",
          date: "March 2, 2023",
          attendee: ["apple@gmail.com", "banana@gmail.com"],
          time: "12:00 PM",
        },
        {
          title: "Meeting 3",
          link: "https://us02web.zoom.us/j/83377978843?pwd=NUg0UHlNM1Y0akoxWkFHOXhpWlk2dz09#success",
          date: "March 3, 2023",
          attendee: ["apple@gmail.com", "banana@gmail.com"],
          time: "12:00 PM",
        },
      ],
    };
  }

  componentDidMount = async () => {
    let userMeeting = await getUserMeetings("shah8y@uwindsor.ca");
    console.log("userMeetings: ", userMeeting);
    //saving in this.state.posts
  };

  deleteMeeting = async () => {
    let deleteMeetingResponse = await deleteMeeting("91752741949");
    if (deleteMeetingResponse === "ok") {
      console.log("Meeting Deleted");
    } else {
      console.log("Cannot delete this meeting");
    }
    //call get user meeting again and update this.state.posts
  };
  render() {
    return (
      <>
        <Nav />
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
            width: "100%",
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
            sx={{
              padding: 1,
            }}
            item
            xs={12}
            sm={8}
            md={4}
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
                justifyContent: "center",
              }}
            >
              <Typography component="h1" sx={{ color: "gray" }} variant="h5">
                List of Meetings
              </Typography>
              <Grid
                container
                spacing={1}
                sx={{ paddingTop: 1, justifyContent: "center" }}
              >
                {/* <Button
                  fullWidth
                  sx={{ height: "3rem", marginTop: 3, marginBottom: 3 }}
                  variant="contained" onClick={this.deleteMeeting}
                >
                  Delete meeting
                </Button> */}
                {this.state.posts.map((post, index) => (
                  <Grid item>
                    <Card
                      key={index}
                      sx={{
                        // border: "1px Solid gray",
                        minWidth: 275,
                        margin: "10px",
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flexStart",
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography
                              sx={{
                                fontSize: 18,
                                fontWeight: "bold",
                                marginBottom: "10px",
                              }}
                              gutterBottom
                            >
                              {post.title}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ paddin: "4px" }}>
                            <Link href={post.link}>{post.link}</Link>
                          </Grid>
                          <Grid item xs={12} sx={{ padding: "4px" }}>
                            {" "}
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "gray",
                              }}
                            >
                              {post.date} {post.time}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            {/* <Typography
                              sx={{
                                fontSize: 14,
                                color: "gray",
                              }}
                            > */}
                            <Stack direction="row" spacing={2}>
                              {post.attendee.map((email, index) => (
                                <Chip
                                  key={index}
                                  variant="contatined"
                                  label={email}
                                  // avatar={<Avatar>{email[0]}</Avatar>}
                                  style={{ marginBottom: "0.5rem" }}
                                />
                              ))}
                            </Stack>
                            {/* Atendee */}
                            {/* </Typography> */}
                          </Grid>
                          <Grid item xs={12}>
                            <Stack direction="row" spacing={2} sx={{paddingTop:"1rem"}}>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                color="error"
                                onClick={this.deleteMeeting}
                              >
                                Delete Meeting
                              </Button>
                              <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                              >
                                Send Invitation
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Posts;
