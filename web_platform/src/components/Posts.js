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
} from "@mui/material";
import Button from "@mui/material/Button";
import { getUserMeetings, deleteMeeting, sendmail } from "../utils/apiCalls";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount = async () => {
    this.getUserMeeting();
  };

  getUserMeeting = async () => {
    let userMeeting = await getUserMeetings(
      localStorage.getItem("userEmailId")
    );
    console.log("userMeetings: ", userMeeting);
    //saving in this.state.posts
    this.setState({ posts: userMeeting });
    console.log("Posts", this.state.posts, this.state.posts.length);
  };

  deleteMeeting = async (meetingId) => {
    console.log(meetingId);
    let deleteMeetingResponse = await deleteMeeting(meetingId);

    if (deleteMeetingResponse === "ok") {
      console.log("Meeting Deleted");
      this.getUserMeeting();
    } else {
      console.log("Cannot delete this meeting");
    }
  };

  sendmail = async (attendee) =>{
    let sendmailResponse = await sendmail(attendee);
    if (sendmailResponse === "ok") {
      console.log("Email send ")
    } else {
      console.log("error while sending email")      
    }
  }

  render() {
    return (
      <>
        <Nav />
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
            padding: 10,
            top: "4",
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
              width: "fitContent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            container
            xs={4}
            md={6}
            sm={10}
            component={Paper}
            elevation={10}
            squares
          >
            <Typography
              component="h1"
              sx={{
                color: "gray",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "2rem",
              }}
              variant="h5"
            >
              LIST OF MEETINGS
            </Typography>
            <Box
              sx={{
                // border: "1px solid gray",
                padding: "1rem",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={1}
                sx={{
                  paddingTop: 1,
                  justifyContent: "center",
                }}
              >
                {this.state.posts.length > 0 ? (
                  this.state.posts.map((post, index) => (
                    <Grid item>
                      <Card
                        key={index}
                        sx={{
                          border: "1px Solid gray",
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
                                {post.Topic}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ paddin: "4px" }}>
                              <Link href={post.Join_URL}>{post.Join_URL}</Link>
                            </Grid>
                            <Grid item xs={12} sx={{ padding: "4px" }}>
                              {" "}
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  color: "gray",
                                }}
                              >
                                {post.Time}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Stack direction="row" spacing={2}>
                                {post.Attendee.map((email, index) => (
                                  <Chip
                                    key={index}
                                    variant="contatined"
                                    label={email}
                                    style={{ marginBottom: "0.5rem" }}
                                  />
                                ))}
                              </Stack>
                            </Grid>
                            <Grid item xs={12}>
                              <Stack
                                direction="row"
                                spacing={2}
                                sx={{ paddingTop: "1rem" }}
                              >
                                <Button
                                  variant="outlined"
                                  startIcon={<DeleteIcon />}
                                  color="error"
                                  onClick={() =>
                                    this.deleteMeeting(post.MeetingId)
                                  }
                                >
                                  Delete Meeting
                                </Button>
                                <Button
                                  variant="contained"
                                  endIcon={<SendIcon />}
                                  onClick={() =>
                                    this.sendmail(post.Attendee)
                                  }
                                >
                                  Send Invitation
                                </Button>
                              </Stack>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography
                    component="body1"
                    variant="span"
                    sx={{
                      fontSize: "1rem",
                      color: "gray",
                      paddingTop: 1,
                    }}
                  >
                    You have no meeting as of now. Please schedule meeting to
                    view it.
                    <Link href="/scheduler" variant="body2">
                      { }
                      {" Click here to Create a Meeting..."}
                    </Link>
                  </Typography>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Posts;
